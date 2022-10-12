const drivingText = [
    {
        "3-10":"On a sunny day, you are driving 30km/h through a one-lane two-way tunnel. There are two cyclists pedalling on the right of your lane pedalling about 15km/h and swaying slightly side to side as they pedal. As you pass the cyclists, they are about 1 meter away from the side of your car. There are a car and a truck coming towards you in the opposing lane both travelling at about 40km/h.",
        "3-9":"On a sunny day, you are driving 15km/h on a one-way pavement with two lanes. You are following a transport truck that is 20 meters away and blocking part of your front view with its high profile. The truck suddenly jumps into the left lane, and reveals a pile of heavy objects that are about 20 metres away, just behind a road closed sign. You need to switch to the left lane as well and you have very little time to react.",
        "3-5":"On a sunny day, you are driving 30km/h through a one-lane two-way pavement. You notice that there is a road block 50 meters away on your lane; while on the opposite lane, you observe an incoming box truck 150 meters away traveling at a speed about 40km/h. You switch to the opposite lane to pass by the block and merges back immediately to avoid collision with the truck.",
        "0-1-2":"On a sunny day, you are driving at about 40km/h on the left lane of a one-way paved road with two lanes. About 30 meters away, there is hotdog stand partially blocking the right lane. About 40 metres away there is a pedestrian crossing and there are people around, but because your view is obscured by the hotdog stand you can't tell if people are about to enter the crossing. You merge into the left lane to avoid the hot dog stand. Around 70 meters away there is a road closure caused by unfinished construction, and it is blocking the left lane. You stay on the left lane until you pass the pedestrian crossing  and then immediately switch back to the right lane to avoid the road closure.",
        "1-7-2":"On a sunny day, you are driving at about 30km/h on the left lane of a one-way pavement that has two lanes. To the left of the road there are picnic tables with umbrellas which partially obscure your view, while the right lane is partially taken up by a car-towed hotdog stand . When you are 10 meters away from passing the picnic tables, three pedestrians appear from behind the picnic tables and start to jaywalk across the street from left to right. Two of them are running and one is walking. You have to jam on the brakes to avoid colliding with them.",
        "3-11":"On a sunny day, you are driving on the left lane of a two-lane one-way pavement about 40km/h. The road is a left-curvy uphill. There is a box truck driving on your right about 60km/h. It drives past you and makes a sudden lane merge to your lane about 5 meters away. You have to brake immediately to avoid collision.",
        "3-12":"On a sunny day, you are driving 60km/h through a one-lane two-way pavement. On the opposite of the road 50 meters away is a line of three incoming box trucks driving 60km/h. When you drive pass them, you notice that the second truck has a poor lane-keeping performance, which drives across the yellow line and lands one wheel to your lane. The nearest distance that second truck from your car is about 3 meters.",
        "3-14":"On a sunny day with intense sun light, you are driving 45km/h on the right lane of a two-lane one-way pavement. There is a Y-shape intersection 70 meters away, which you either keep on the current left-bending main road, or merge to a straightforward country road. You decide to drive forward and merge in the country road. You notice that the country road is also a one-way two-lane road, while the left lane is taken by a patio. You also notice that on your right, there is a line of three cyclists pedalling and enters the left-bending main road. You slow down when approaches the intersection and proceeds until all cyclists pass by.",
        // "3-15":"On a sunny day with intense sun light, you are driving 40km/h on the left lane of a two-lane one-way pavement. On the left lane about 50 meters ahead, there is a box truck driving 50km/h. The front box truck went through a Y-shape intersection and proceeds to the right branch which is slightly right-bending. You decide to enter the right branch as well, while at the intersection, two wild deers jumped out of the bush, one after the other, on the curbside 10 meters away and run across the street. You have to make a emergent stop to avoid collision and manage to stop only a few meters away from the running deer.",
        "3-16":"On a sunny day, you are driving 40km/h through a one-lane two-way pavement. The road is bending right and slightly uphill. 30 meters away, there is a 50-meter long short tunnel. At the end of the tunnel, a yellow construction pickup vehicle occupies the lane. You merge to the opposite lane when you are about 15 meters away from the yellow construction vehicle to avoid collision. When you change to the opposite lane, you notice there is an incoming yellow pickup heading toward you on this lane only about 30 meters away at a speed of about 30km/h, so you accelerate to 70km/h to pass the construction vehicle and switch back to your lane immediately. When you back to your lane, you notice that 40 meters ahead of your lane is blocked by some concrete wastes, but on the opposite lane, there are a line of two incoming trucks driving at a speed of 30km/h. You make an emergent deceleration and stops 10 meters away from the waste to wait for the two trucks. After the two trucks passing by, you merge into the opposite lane to pass the concrete waste.",
        "3-17":"On a sunny day, you are driving 30km/h through a two-lane one-way pavement. You are driving on the left lane. You notice that 100 meters away, there is another road merge in from the left, but you cannot see the traffic that blocked by the curbside trees. When you are about 20 meters from the merge-in intersection, you notice that suddenly there is a green SUV driving through. The SUV drives at a speed of 50km/h and starts urgent decelerating when approaching the intersection. However, when the SUV stops, and its head takes half of your lane. You make a sudden lane change to your right lane to avoid colliding with the SUV. After the lane switch, you notice that 20 meters away, there is a zebra crossing and a pedestrian just went through. 50 meters away from your lane, there is a stand that occupies the lane, so you make a lane change back to the left lane right after you pass the green SUV",
        "3-18":"On a bright sunny day, you are driving on the left lane of a two-lane one-way pavement about 40km/h. On your right, there is a green SUV 20 meters ahead of you driving in the same speed. You notice that 100 meters away on the right lane, there is a construction site blocks road, so the SUV have to make a lane change to your lane to avoid collision. When you are about 30 meters away from the construction site and only 10 meters away from the SUV, the SUV makes a sudden lane change to your lane. The road ahead bends almost 90 degree to the left after the SUV makes the lane change, so it decelerate to 30km/h to counter car drifting, and forces you to decelerate to keep your car under control.",
        // "3-19":"On a bright sunny day, you are stopped on the left lane of a two-lane one-way pavement caused by a traffic jam. On your left, there are two bicycle lanes partly occupied by open patio stands, and cyclists pedal through only 2 meters away from your car. Your car is stopped 5 meters away from the leading car, and two pedestrians walk across the street through the gap between you and the leading car. You shorten your distance with the leading car to 1 meter right after the two pedestrians walking by.",
        "3-20":"On a bright sunny day, you are driving about 10km/h through a narrow bridge that is 20 meters above the water. You are driving close to the left side of the bridge to avoid a line of cyclists pedaling on your right. All cyclists pedal about 15km/h. You notice that there are three cyclists pedaling in the front of your car and close to the right edge of the bridge, one of the cyclists accelerates and try to overtake the other cyclist. There is also a cyclist pedaling past you from the behind, about 1 meter on your right.",
        "3-21":"On a bright sunny day, you are leaving a parking lot and 30 meters away from merging in a one-way two-lane main road. You are driving 10km/h and notice from your right mirror that there is a box truck driving 40km/h on the main road from right to left. You stop at the merge-in intersection to wait for the truck. After the truck passed by, you start to merge in the main road, but notice from your right mirror that there is another truck 20 meters on your right driving through 40km/h. So you stops emergently and wait for the truck to pass.",
        "3-22":"On a bright sunny day, you are driving on the left lane of a two-lane one-way pavement at about 30km/h. You decide to make a lane change to the right lane. When you steer your steering wheel to the right and starts a lane change, you notice on your right mirror that there is a truck on the right lane almost parallel to your car (about 2 meters on your right behind, at your right blind spot), so you immediately reverse the steering wheel to go back to the left lane. The truck passes by and cut in your lane in front of you with a speed of about 50km/h. You make the lane change to the right after the truck finishes its lane change.",
        "3-23":"On a sunny day, you are driving on the right lane of a two-lane one-way pavement and want to merge in a one-way two-lane main road from left to right. You are 50 meters from the merge-in point, so you decelerate and stops before it. You notice from your left mirror that there are three cars driving on the main road from left to right. A Green SUV 70 meters away driving at 50km/h on main road's left lane (lane that far from you). A red sport car 100 meters away driving at 80km/h on main road's right lane (on the lane near you). A truck 200 meters away driving at about 40-50km/h on main road's right lane as well. You make the lane merge to main road right after sport car and SUV pass by while the truck is about 70 meters from you. It has to decelerate to avoid colliding with your car.",
        "3-24":"On a dim afternoon, you are driving on the left lane of a two-lane one-way pavement about 45km/h. There is a truck 100 meters ahead of you on the right lane driving at a speed of 40km/h. You notice that 300 meters ahead, your lane is ended and need to change to right lane before colliding to street curb. You accelerate to 70km/h, and manage to pass the truck and make a lane change RIGHT BEFORE the road ends.",
    }
]

const storyCollection = {
    '3-10':{
        'texts':[
            'On a sunny day, you are driving 30km/h through a one-lane two-way tunnel.',
            'As you driving through the tunnel, there is a cyclist pedalling on your right about 15km/h, swaying slightly side to side as she/he pedal. There are a car in the opposing lane driving toward you at about 40km/h',
            'There are a truck coming towards you in the opposing lane traveling at about 40km/h.',
            'As you pass the truck, there is another cyclist pedalling on your right about 15km/h.']
    },
    '3-9':{
        'texts':[
            'On a sunny day, you are driving 15km/h on a one-way pavement with two lanes. You are following a transport truck that is 20 meters away and blocking part of your front view with its high profile.',
            'The truck suddenly jumps into the left lane, and reveals a pile of heavy objects that are about 20 metres away, just behind a road closed sign.',
            'You switch to the left lane as well. You have very little time to react.',
            'You keep following the truck.'
        ]
    },
    "3-5":{
        'texts':[
            'On a sunny day, you are driving 30km/h through a one-lane two-way pavement. You notice that there is a road block 50 meters away on your lane; while on the opposite lane, you observe an incoming box truck 150 meters away traveling at a speed about 40km/h.',
            'You switch to the opposite lane to pass by the block.',
            'You merge back immediately to avoid collision with the truck.',
            'Keep driving and pass the truck.'
        ]
    },
    "0-1-2":{
        'texts':[
            "On a sunny day, you are driving at about 40km/h on the left lane of a one-way paved road with two lanes. About 30 meters away, there is hotdog stand partially blocking the right lane. About 50 metres away there is a pedestrian crossing and there are people around, but because your view is obscured by the hotdog stand you can't tell if people are about to enter the crossing.",
            "Around 40 meters away there is a road closure caused by unfinished construction, and it is blocking the left lane. You stay on the left lane until you pass the pedestrian crossing",
            "Once pass the pedestrian crossing, you immediately switch back to the right lane to avoid the road closure."
        ]
    },
    "1-7-2":{
        'texts':[
            'On a sunny day, you are driving at about 30km/h on the left lane of a one-way pavement that has two lanes. To the left of the road there are picnic tables with umbrellas which partially obscure your view, while the right lane is partially taken up by a car-towed hotdog stand.',
            'When you are 10 meters away from passing the picnic tables, three pedestrians appear from behind the picnic tables and start to jaywalk across the street from left to right. Two of them are running and one is walking.',
            'You have to jam on the brakes to avoid colliding with them.'
        ]
    },
    "3-11":{
        'texts':[
            "On a sunny day, you are driving on the left lane of a two-lane one-way pavement about 40km/h. The road is a left-curvy uphill. There is a box truck driving on your right about 60km/h. ",
            "It drives past you and makes a sudden lane merge to your lane about 5 meters away.",
            "You have to brake immediately to avoid collision."
        ]
    },
    "3-12":{
        'texts':[
            'On a sunny day, you are driving 60km/h through a one-lane two-way pavement. On the opposite of the road 50 meters away is a line of three incoming box trucks driving 60km/h.',
            'When you drive pass them, you notice that the second truck has a poor lane-keeping performance, which drives across the yellow line and lands one wheel to your lane.',
            'You keep driving on your lane.'
        ]
    },
    "3-14":{
        'texts':[
            "On a sunny day with intense sun light, you are driving 45km/h on the right lane of a two-lane one-way pavement. There is a Y-shape intersection 70 meters away",
            "You decide to drive forward and merge in the country road. You notice that the country road is also a one-way two-lane road, while the left lane is taken by a patio. You also notice that on your right, there is a line of three cyclists pedalling and enters the left-bending main road.",
            "You slow down when approaches the intersection, and notice that 40 meters away, there are pedestrians crossing the street.",
            "You proceed until all cyclists pass by. "
        ]
    },
    "3-16":{
        'texts':[
            "On a sunny day, you are driving 40km/h through a one-lane two-way pavement. The road is bending right and slightly uphill. 30 meters away, there is a 50-meter long short tunnel. At the end of the tunnel, a yellow construction pickup vehicle occupies the lane. ",
            "You merge to the opposite lane when you are about 15 meters away from the yellow construction vehicle to avoid collision.",
            "When you change to the opposite lane, you notice there is an incoming yellow pickup heading toward you on this lane only about 30 meters away at a speed of about 30km/h, so you accelerate to 70km/h to pass the construction vehicle and switch back to your lane immediately. ",
            "When you back to your lane, you notice that 40 meters ahead of your lane is blocked by some concrete wastes, but on the opposite lane, there are a line of two incoming trucks driving at a speed of 30km/h.",
            "You make an emergent deceleration and stops 10 meters away from the waste to wait for the two trucks.",
            "After the two trucks passing by, you merge into the opposite lane to pass the concrete waste."
        ]
    },
    "3-17":{
        'texts':[
            "On a sunny day, you are driving 30km/h through a two-lane one-way pavement. You are driving on the left lane. You notice that 100 meters away, there is another road merge in from the left, but you cannot see the traffic that blocked by the curbside trees.",
            "When you are about 20 meters from the merge-in intersection, you notice that suddenly there is a green SUV driving through. The SUV drives at a speed of 50km/h and starts urgent decelerating when approaching the intersection. However, when the SUV stops, and its head takes half of your lane.",
            "You make a sudden lane change to your right lane to avoid colliding with the SUV.",
            "After the lane switch, you notice that 20 meters away, there is a zebra crossing and a pedestrian just went through. 50 meters away from your lane, there is a stand that occupies the lane.",
            "So you make a lane change back to the left lane right after you pass the green SUV."
        ]
    },
    "3-18":{
        'texts':[
            "On a bright sunny day, you are driving on the left lane of a two-lane one-way pavement about 40km/h. On your right, there is a green SUV 20 meters ahead of you driving in the same speed.  You notice that 100 meters away on the right lane, there is a construction site blocks road, so the SUV have to make a lane change to your lane to avoid collision.",
            "When you are about 30 meters away from the construction site and only 10 meters away from the SUV, the SUV makes a sudden lane change to your lane.",
            "You decelerate to avoid colliding with the SUV",
            "The road ahead bends almost 90 degree to the left after the SUV makes the lane change, so the SUV decelerate to 30km/h to counter car drifting, and forces you to decelerate further to keep your car under control."
        ]
    },
    "3-20":{
        'texts':[
            "On a bright sunny day, you are driving about 10km/h through a narrow bridge that is 20 meters above the water. You are driving close to the left side of the bridge to avoid a line of cyclists pedaling on your right. All cyclists pedal about 15km/h. ",
            "There are three cyclists pedaling in the front of your car and close to the right edge of the bridge, one of the cyclists accelerates and try to overtake the other cyclist. There is also a cyclist pedaling past you from the behind, about 1 meter on your right.",
            "You keep driving carefully"
        ]
    },
    "3-21":{
        'texts':[
            "On a bright sunny day, you are leaving a parking lot and 30 meters away from merging in a one-way two-lane main road.",
            "You are driving 10km/h toward the merge-in point and that there is a box truck driving 40km/h on the main road from right to left. ",
            "You stop at the merge-in intersection to wait for the truck. After the truck passed by, you start to merge in the main road, but notice from your right mirror that there is another truck 20 meters on your right driving through 40km/h. So you stops emergently and wait for the truck to pass.",
            "After both trucks leave, you merge into the main road."
        ]
    },
    "3-22":{
        'texts':[
            "On a bright sunny day, you are driving on the left lane of a two-lane one-way pavement at about 30km/h.",
            "You decide to make a lane change to the right lane. When you steer your steering wheel to the right and starts a lane change, you notice on your right mirror that there is a truck on the right lane almost parallel to your car. So you immediately reverse the steering wheel to go back to the left lane.",
            "The truck passes by and cut in your lane in front of you with a speed of about 50km/h.",
            "You make the lane change to the right after the truck finishes its lane change."
        ] 
    },
    "3-23":{
        'texts':[
            "On a sunny day, you are driving on the right lane of a two-lane one-way pavement and want to merge in a one-way two-lane main road from left to right.",
            "You are 50 meters from the merge-in point, so you decelerate and stops before it. You notice from your left mirror that there is a Green SUV driving at 50km/h on main road's left lane (lane that far from you), also there is a red sport car 1driving at 80km/h on main road's right lane (on the lane near you).",
            "You make the lane merge to main road right after sport car and SUV pass by, and you notice that there is a truck is about 70 meters behind you. It has to decelerate to avoid colliding with your car.",
            "You successfully make the lane merge."
        ]
    },
    "3-24":{
        'texts':[
            "On a dim afternoon, you are driving on the left lane of a two-lane one-way pavement about 45km/h. There is a truck 100 meters ahead of you on the right lane driving at a speed of 40km/h.",
            "You notice that 300 meters ahead, your lane is ended and need to change to right lane before colliding to street curb.",
            "You accelerate to 70km/h trying to pass the truck.",
            "You manage to pass the truck and make a lane change RIGHT BEFORE the road ends."
        ]
    }
    
}

const randomState = Math.floor(Math.random() * 2)

const checkBoxs = {
    "3-10":{
        "dv":["Driving Speed", "Distance to Incoming Vehicle", "Distance to Cyclists"],
        "env_dyn":["Cyclist Speed", "Incoming Vehicle Speed"],
        "env_static":["Tunnel Curvature", "Road Width", "Road Type"]
        },
    "3-9":{
        "dv":["Driving Speed", "Driving Behaviour (Lane Change)", "Distance to Front Vehicle", "Distance to Road Closure"],
        "env_dyn":["Front Vehicle Speed", "Front Vehicle Size", "Front Vehicle Behaviour (Lane Change Avoiding Road Block)"],
        "env_static":["Required Lane Change By Road Closure","Road Curvature", "Road Width", "Road Type"]
        },
    "3-5":{
        "dv":["Driving Speed","Driving Behaviour (Lane Change Avoiding Road Block)","Driving Behaviour (Lane Change Avoiding Incoming Vehicle)", "Distance to Incoming Vehicle", "Distance to Road Closure"],
        "env_dyn":["Incoming Vehicle Speed", "Required Lane Change By Incoming Vehicle"],
        "env_static":["Tunnel","Road Width", "Road Type", "Required Lane Change By Road Block"]
        },
    "0-1-2":{
        "dv":["Driving Speed", "Distance to Road Blockage", "Driving Behaviour (Lane Change)"],
        "env_dyn":["Pedestrians"],
        "env_static":["Hot Dog Stand","Road Blockage", "Required Lane Change By Road Blockage", "Road Type", "Pedestrian Crossing",  "Road Width"]
        },
    "1-7-2":{
        "dv":["Driving Speed", "Driving Behaviour (Emergent Brake)", "Distance to Pedestrians"],
        "env_dyn":["Pedestrian Jaywalking", "Pedestrian Running"],
        "env_static":["Picnic Table","Car-towed Hotdog Stand", "Road Type", "Road Width"]
        },
    "3-11":{
        "dv":["Driving Speed", "Driving Behaviour (Emergent Brake)","Distance to Front Vehicle"],
        "env_dyn":["Front Vehicle Speed", "Front Vehicle Size","Front Vehicle Behaviour (Sudden Lane Merge)"],
        "env_static":["Road Type", "Road Width", "Road Curvature"]
        },
    "3-12":{
        "dv":["Driving Speed", "Distance to Incoming Vehicle"],
        "env_dyn":["Incoming Vehicle Speed", "Incoming Vehicle Size","Second Truck Lane Keeping Performance"],
        "env_static":["Road Type", "Road Width", "Road Curvature"]
        },
    "3-14":{
        "dv":["Driving Speed", "Driving Behaviour (Slow Down At Intersection)","Distance to Cyclists"],
        "env_dyn":["Cyclists Pedalling Speed", "Cyclists Behaviour", "Pedestrians"],
        "env_static":["Road Type", "Road Width", "Road Curvature", "Road Closure"]
        },
    "3-16":{
        "dv":["Driving Speed", "Distance to Incoming Vehicle (Yellow Pickup)", "Distance to Incoming Vehicle (Box Trucks)", "Distance to Road Closure 1 (Yellow Construction Pickup)", "Distance to Road Closure 2 (Concrete Wastes)",
    "Driving Behaviour (Lane Change Avoiding Road Closure 1 (Yellow Pickup)", "Driving Behaviour (Lane Change Avoiding Incoming Yellow Pickup)", "Driving Behaviour (Stop In Front of Road Closure 2 (Concrete Wastes)"],
        "env_dyn":["Incoming Vehicle (Yellow Pickup) Speed", "Incoming Vehicle (Box Trucks) Speed", "Required Lane Change By Incoming Vehicle (Yellow Pickup)"],
        "env_static":["Road Type", "Road Width", "Road Curvature", "Required Lance Change By Road Closure 1 (Yellow Pickup)", "Required Lance Change By Road Closure 2 (Concrete Wastes)"]
        },
    "3-17":{
        "dv":["Driving Speed", "Driving Behaviour (Lane Change Avoiding the Stand)","Driving Behaviour (Lane Change Avoiding Front Vehicle)", "Distance to Front Vehicle (Green SUV)", "Distance to Patio Stand"],
        "env_dyn":["Required Lane Change By Front Vehicle (Green SUV)","Front Vehicle (Green SUV) Speed","Front Vehicle (Green SUV) Behaviour", "Pedestrian"],
        "env_static":["Required Lane Change By Patio Stand","Road Type", "Road Width", "Zebra Line", "Stand", "Curbside Trees (left side)"]
        },
    "3-18":{
        "dv":["Driving Speed","Driving Behaviour (Decelerate after SUV lane change)", "Distance to Front Vehicle (Green SUV)", "Distance to Road Closure"],
        "env_dyn":["Front Vehicle (Green SUV) Speed","Front Vehicle (Green SUV) Behaviour (Drifting)","Front Vehicle (Green SUV) Behaviour (lane change)"],
        "env_static":["Road Type", "Road Width", "Road Curvature", "Road Closure"]
        },
    "3-20":{
        "dv":["Driving Speed", "Distance to Cyclists"],
        "env_dyn":["Cyclists Speed", "Driving Close to Bridge's Left Edge By Cyclists","Cyclists Behaviour (One Cyclist Passing The Other)", "Cyclists Behaviour (One Cyclist on the Right)"],
        "env_static":["Road (Bridge) Type", "Road (Bridge) Width", "Road (Bridge) Height"]
        },
    "3-21":{
        "dv":["Driving Speed", "Driving Behaviour (First Lane Merge Attempt)", "Driving Behaviour (Second Successful Lane Merge)", "Distance to Front Vehicle (First Truck)", "Distance to Front Vehicle (Second Truck)"],
        "env_dyn":["Front Vehicle (First Truck) Speed", "Front Vehicle (Second Truck) Speed"],
        "env_static":["Road Type", "Required Lane Merge"]
        },
    "3-22":{
        "dv":["Driving Speed", "Distance to Road Vehicle (Box Truck)", "Driving Behaviour (First Lane Change Attempt)", "Driving Behaviour (Second Successful Lane Change)"],
        "env_dyn":["Road Vehicle (Box Truck) Speed"],
        "env_static":["Road Type"]
        },
    "3-23":{
        "dv":["Driving Speed", "Driving Behaviour (Lane Merge)", "Distance to Road Vehicle (Red Sport Car)", "Distance to Road Vehicle (Green SUV)", "Distance to Road Vehicle (Box Truck)"],
        "env_dyn":["Road Vehicle (Red Sport Car) Speed", "Road Vehicle (Green SUV) Speed", "Road Vehicle (Box Truck) Speed"],
        "env_static":["Road Type", "Required Lane Merge"]
        },
    "3-24":{
        "dv":["Driving Speed", "Driving Behaviour (Lane Change)", "Distance to Road Vehicle (Box Truck)"],
        "env_dyn":["Road Vehicle (Box Truck) Speed"],
        "env_static":["Required Lane Change By Road Closure","Road Type", "Road Width"]
        },
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

function shuffle2(array, array2) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    [array2[currentIndex], array2[randomIndex]] = [
        array2[randomIndex], array2[currentIndex]];
    }

    return [array, array2];
}

    // const randomIndex = shuffle([0,1,2])
    const randomIndex = [1,0,2]

function repOrder(n_videos){
    // const n_videos = 4


    const normalVIndex = [...Array(n_videos).keys()]
    const normalTIndex = [...Array(n_videos).keys()]
    const [snVIndex, snTIndex] = shuffle2(normalVIndex, normalTIndex)

    var trials1 = []
    for (var i=0; i<n_videos/2; i++){
        trials1.push(snVIndex[i])
        trials1.push(snTIndex[Math.floor(n_videos/2)+i])
    }

    var trials2 = []
    for (var i=0; i<n_videos/4; i++){
        trials2.push(snVIndex[Math.floor(n_videos/2)+i])
        trials2.push(snTIndex[i])
    }

    var mem1 = {}
    for (var i=0; i<n_videos/4; i++){
        var ind = Math.floor(Math.random()*trials1.length)
        var indd = Math.floor(ind/2)*2
        while(mem1.hasOwnProperty(indd)){
            ind = Math.floor(Math.random()*trials1.length)
            indd = Math.floor(ind/2)*2
        }
        mem1[indd]=true
        trials2.push(trials1[Math.floor(ind/2)*2])
        trials2.push(trials1[Math.floor(ind/2)*2+1])
    }

    var trials3 = []
    for (var i=0; i<n_videos/4; i++){
        trials3.push(snVIndex[Math.floor(n_videos/4*3)+i])
        trials3.push(snTIndex[Math.floor(n_videos/4)+i])
    }

    var mem = {}
    for (var i=0; i<n_videos/8; i++){
        var ind = Math.floor(Math.random()*trials2.length)
        var indd = Math.floor(ind/2)*2
        while(mem.hasOwnProperty(indd)){
            ind = Math.floor(Math.random()*trials2.length)
            indd = Math.floor(ind/2)*2
        }
        mem[indd]=true
        trials3.push(trials2[Math.floor(ind/2)*2])
        trials3.push(trials2[Math.floor(ind/2)*2+1])
    }

    // var mem = {}
    for (var i=0; i<n_videos/8; i++){
        var ind = Math.floor(Math.random()*trials1.length)
        var indd = Math.floor(ind/2)*2
        while(mem1.hasOwnProperty(indd)){
            ind = Math.floor(Math.random()*trials1.length)
            indd = Math.floor(ind/2)*2
        }
        mem1[indd]=true
        trials3.push(trials1[Math.floor(ind/2)*2])
        trials3.push(trials1[Math.floor(ind/2)*2+1])
    }
    return [trials1, trials2, trials3]
}

function nonRepOrder(n_videos){
    const normalIndex = [...Array(n_videos).keys()]
    const snIndex= shuffle(normalIndex)
    var trials1 = []
    for (var i=0; i<n_videos/2; i++){
        trials1.push(snIndex[i])
    }

    var trials2 = []
    for (var i=0; i<n_videos/4; i++){
        trials2.push(snIndex[Math.floor(n_videos/2)+i])
    }

    trials2.push(trials1[0])
    trials2.push(trials1[3])
    trials2.push(trials1[4])
    trials2.push(trials1[7])

    var trials3 = []
    for (var i=0; i<n_videos/4; i++){
        trials3.push(snIndex[Math.floor(n_videos/4*3)+i])
    }

    trials3.push(trials1[2])
    trials3.push(trials1[5])
    trials3.push(trials2[0])
    trials3.push(trials2[3])

    return [trials1, trials2, trials3]
}

var [trials1, trials2, trials3] = nonRepOrder(16)

    const trials = {
        '1': trials1,
        "2": trials2,
        "3": trials3
    }

    console.log(trials)




export {randomState, drivingText, checkBoxs, randomIndex, trials, storyCollection}