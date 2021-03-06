/* Dawnveil
    World Tour Guide
	Spinel
    Made by Daenerys
*/
var status = -1;
var cost, sel;
var togo1, togo2, togo3;
var map;
var back = true;
var maps = [104020000, 200000000, 211000000, 220000000, 221000000, 222000000, 230000000, 240000000, 250000000, 251000000, 260000000, 261000000, 270000000];

function start() {
    switch (cm.getMapId()) {
        case 800000000:
        case 500000000:
        case 701000000:
        case 740000000:
            map = cm.getSavedLocation("WORLDTOUR");
            cm.sendSimple("How's the traveling? Are you enjoying it? \n\r #b#L0# Can I go somewhere else?#l \n\r #L1# I'm done with traveling. Can I go back to #m"+map+"#?#l");
            break;
        case 950000100:
            sel = 123456;
            cm.sendSimple("Don't be surprised that you are here because of unexcepted phenomenon. I'll send you to Maple World again. Please choose where you want to go.\r\n#L0#Port Road#l\r\n#L1#Orbis#l\r\n#L2#El Nath#l\r\n#L3#Ludibrium#l\r\n#L4#Omega Sector#l\r\n#L5#Korean Folk Town#l\r\n#L6#Aquarium#l\r\n#L7#Leafre#l\r\n#L8#Mu Lung#l\r\n#L9#Herb Town#l\r\n#L10#Ariant#l\r\n#L11#Magatia#l\r\n#L12#Three Doors#l");
            break;
        default:
            back = false;
            if (cm.getJob() == 0) {
                cm.sendNext("If you're tired of the monotonous daily life, how about getting out for a change? There's nothing quite like soaking up a new culture, learning something new by the minute! It's time for you to get out and travel. We recommend a\r\n#bWorld Tour#k! Are you worried about the travel expense? No need to worry! The #bMaple Travel Agency#k offers first class travel accommodation for the low price of #b300 mesos#k.");
                cost = 300;
            } else {
                cm.sendNext("If you're tired of the monotonous daily life, how about getting out for a change? There's nothing quite like soaking up a new culture, learning something new by the minute! It's time for you to get out and travel. We, at the Maple Travel Agency recommend you going on a #bWorld Tour#k! Are you worried about the travel expense? You shouldn't be! We, the #bMaple Travel Agency#k, have carefully come up with a plan to let you travel for ONLY #b3,000 mesos!#k");
                cost = 3000;
            }
            break;
    }
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if ((status <= 2 && mode == 0) || (status == 4 && mode == 1)) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (!back) {
            if (status == 0) {
                cm.sendSimple("We currently offer this place for your traveling pleasure:\r\n#bMushroom Shrine of Japan#k. I'll be there serving you as the travel guide. Rest assured, the number of destinations will increase over time. Now, would you like to head over to the Mushroom Shrine?\r\n#L0##b Yes, take me to Mushroom Shrine (Japan)#k#l");
            } else if (status == 1) {
                cm.sendYesNo("Would you like to travel to the #bMushroom Shrine of Japan#k?\r\nIf you desire to feel the essence of Japan, there's nothing like visiting the Shrine, a Japanese cultural melting pot. Mushroom Shrine is a mythical place that serves the incomparable Mushroom God from ancient times.");
            } else if (status == 2) {
                cm.sendNext("Check out the female shaman serving the Mushroom God, and I strongly recommend trying Takoyaki, Yakisoba, and other delicious food sold in the streets of Japan. Now, let's head over to #bMushroom Shrine#k, a mythical place if there ever was one.");
            } else if (status == 3) {
                if (cm.getMeso() < cost) {
                    cm.sendPrev("Please check and see if you have enough mesos to go.");
                } else {
                    cm.gainMeso(-cost);
                    cm.saveLocation("WORLDTOUR");
                    cm.warp(800000000, 0);
                    cm.dispose();
                }
            }
        } else {	    
            if (status == 0) {
                if (sel == 123456) {
                    cm.warp(maps[selection]);
                    cm.dispose();
                    return;
                }
                if (selection == 0) {
                    switch (cm.getMapId()) {
                        case 740000000:
                            togo1 = 800000000;
                            togo2 = 701000000;
                            togo3 = 500000000;
                        case 500000000:
                            togo1 = 800000000;
                            togo2 = 701000000;
                            togo3 = 740000000;
                            break;
                        case 800000000:
                            togo1 = 701000000;
                            togo2 = 500000000;
                            togo3 = 740000000;
                            break;
                        case 701000000:
                            togo1 = 500000000;
                            togo2 = 800000000;
                            togo3 = 740000000;
                            break;
                        default:
                            cm.dispose();
                            return;
                    }
                    cm.sendSimple("Where would you like to travel? \n\r #b#L0##m"+togo1+"# (3,000 mesos)#l \n\r #L1##m"+togo2+"# (3,000 mesos)#l \n\r #L2##m"+togo3+"# (3,000 mesos)#l");

                } else if (selection == 1) {
                    cm.warp(map == -1 ? 100000000 : map);
                    cm.clearSavedLocation("WORLDTOUR");
                    cm.dispose();
                }
            } else if (status == 1) {
                sel = selection;
                if (sel == 0) {
                    cm.sendNext("Would you like to travel to #b#m"+togo1+"##k? To head over, it'll cost you only #b3,000 mesos#k. Would you like to go right now?");
                } else if (sel == 1) {
                    cm.sendNext("Would you like to travel to #b#m"+togo2+"##k? To head over, it'll cost you only #b3,000 mesos#k. Would you like to go right now?");
                } else if (sel == 2) {
                    cm.sendNext("Would you like to travel to #b#m"+togo3+"##k? To head over, it'll cost you only #b3,000 mesos#k. Would you like to go right now?");
                }
            } else if (status == 2) {
                if (sel == 0) {
                    cm.warp(togo1);
                } else if (sel == 1) {
                    cm.warp(togo2);
                } else if (sel == 2) {
                    cm.warp(togo3);
                }
                cm.dispose();
            }
        }
    }
}