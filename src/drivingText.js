const drivingText = [
    {
        "3-10":"On a sunny day, you are driving 30km/h through a one-lane two-way tunnel. On your lane, there are two cyclists pedalling on your right about 15km/h; on the opposite lane, there is a sedan and a truck driving one after another, both about 40km/h.",
        "3-9":"On a sunny day, you are driving 15km/h on a two-lane one-way concrete road. You are following a box truck that is 20 meters away and blocking part of your front view. Suddenly. the truck changed to its left lane, and reveals a road closure sign. You noticed that you car will collide with the road block within 3 seconds, and you immediately switched to the left lane as well.",
        "3-5":"On a sunny day, you are driving 30km/h through a one-lane two-way concrete road. You notice that there is a road block 50 meters away on your lane; while on the opposite lane, you observe an incoming box truck 150 meters away traveling at a speed about 40km/h. You switch to the opposite lane to pass by the block and merges back immediately to avoid collision with the truck.",
        "0-1-2":"On a sunny day, you are driving on the left lane of a two-lane one-way concrete road about 40km/h. You notice that 30 meters away, there is a open patio taken the right lane; behind the patio, there is a crossroad with traffic light. It is green light right now and some pedestrians walking around on the curbside, but the patio blocks part of your view so you cannot see if there are pedestrians waiting under the traffic light. On your lane, however, 70 meters away, there is a road closure caused by unfinished construction. You stay on the left lane until you pass the crossroad and switch back to right lane immediately to avoid the road closure.",
        "1-7-2":"On a sunny day, you are driving on the left lane of a two-lane one-way concrete road about 30km/h. On the left side of the road, there are two bicycle lanes as well. You notice that both the bicycle lanes are taken by open patio stands, while the right lane is taken by a car-towed hotdog stand and that makes your lane narrower. When you are 10 meters away from passing the patio, there are three pedestrians appearing behind the patio and starting to jaywalk cross the street. Two of them are running and one is walking. You make a emergency stop to avoid the collision and stop only 5 meters away from the pedestrian",
        "3-11":"On a sunny day, you are driving on the left lane of a two-lane one-way concrete road about 40km/h. The road is a left-curvy uphill. There is a box truck driving on your right about 60km/h. It drive passed you and made a sudden lane merge to your lane about 5 meters away. You have to brake immediately to avoid collision.",
        "3-12":"On a sunny day, you are driving 60km/h through a one-lane two-way concrete road. On the opposite of the road 50 meters away is a line of three incoming box trucks driving 60km/h. When you drive pass them, you notice that the second truck has a poor lane-keeping performance, which drives across the yellow line and lands one wheel to your lane. The nearest distance that second truck from your car is about 3 meters.",
        "3-14":"On a sunny day with intense sun light, you are driving 45km/h on the right lane of a two-lane one-way concrete road. There is a Y-shape intersection 70 meters away, which you either keep on the current left-bending main road, or merge to a straightforward country road. You decide to driving forward and merge in the country road. You notice that the country road is also a one-way two-lane road, while the left lane is taken by a patio. You also notice that on your right, there is a line of three cyclists pedalling and enters the left-bending main road. You slow down when approaches the intersection and proceeds until all cyclists pass by.",
        "3-15":"On a sunny day with intense sun light, you are driving 40km/h on the left lane of a two-lane one-way concrete road. On the left lane about 50 meters ahead, there is a box truck driving 50km/h. The front box truck went through a Y-shape intersection and proceeds to the right branch which is slightly right-bending. You decide to enter the right branch as well, while at the intersection, two wild deers jumped out of the bush, one after the other, on the curbside 10 meters away and run across the street. You have to make a emergent stop to avoid collision and manage to stop only a few meters away from the running deer.",
        "3-16":"On a sunny day, you are driving 40km/h through a one-lane two-way concrete road. The road is bending right and slightly uphill. 30 meters away, there is a 50-meter long short tunnel. At the end of the tunnel, a construction vehicle occupies the lane. You merge to the opposite lane when you are about 15 meters away from the construction vehicle to avoid collision. When you change to the opposite lane, you notice there is a incoming car heading toward you on this lane only about 30 meters away at a speed of about 20km/h, so you accelerate to 70km/h to pass the construction vehicle and switch back to your lane immediately. When you back to your lane, you notice that 40 meters ahead of your lane is blocked by some concert wastes, but on the opposite lane, there are a line of two incoming trucks driving at a speed of 30km/h. You make an emergent deceleration and stops 10 meters away from the waste to wait for the two trucks. After the two trucks passing by, you merge into the opposite lane to pass the concrete waste.",
        "3-17":"On a sunny day, you are driving 30km/h through a two-lane one-way concrete road. You are driving on the left lane. You notice that 100 meters away, there is another road merge in from the left, but you cannot see the traffic that blocked by the curbside trees. When you are about 20 meters from the merge-in intersection, you notice that suddenly there is a green SUV driving through. The SUV drives at a speed of 50km/h and starts urgent decelerating when approaching the intersection. However, the SUV cannot stop in-time and its head takes half of your lane. You make a sudden lane change to your right lane to avoid colliding with the SUV. After the lane switch, you notice that 20 meters away, there is a zebra crossing and a pedestrian just went through. 50 meters away from your lane, there is a stand that occupies the lane, so you make a lane change back to the left lane right after you pass the green SUV",
        "3-18":"On a bright sunny day, you are driving on the left lane of a two-lane one-way concrete road about 40km/h. On your right, there is a SUV 20 meters ahead of you driving in the same speed. You notice that 100 meters away on the right lane, there is a construction site blocks road, so the SUV have to make a lane change to your lane to avoid collision. When you are about 30 meters away from the construction site and only 10 meters away from the SUV, the SUV makes a sudden lane change to your lane. The road ahead bends almost 90 degree to the left after the SUV makes the lane change, so it decelerate to 30km/h to counter car drifting, and forces you to decelerate to keep your car under control.",
        "3-19":"On a bright sunny day, you are stopped on the left lane of a two-lane one-way concrete road caused by a traffic jam. On your left, there are two bicycle lanes partly occupied by open patio stands, and cyclists pedal through only 2 meters away from your car. Your car is stopped 5 meters away from the leading car, and two pedestrians walk across the street through the gap between you and the leading car. You shorten your distance with the leading car to 1 meter right after the two pedestrians walking by.",
        "3-20":"On a bright sunny day, you are driving about 10km/h through a narrow bridge that 20 meters above water. You know that your car is about 2 meters wide, while the bridge is about 4 meters wide. You are driving close to the left side of the bridge to avoid a line of 4 cyclists on your right. All cyclists pedals about 15km/h. ",
        "3-21":"On a bright sunny day, you are leaving a parking lot and 30 meters away from merging in a one-way two-lane main road. You are driving 10km/h and notice from your right mirror that there is a box truck driving 40km/h on the main road from right to left. You stop at the merge-in intersection to wait for the truck. After the truck passed by, you start to merge in the main road, but notice from your right mirror that there is another truck 20 meters on your right driving through 40km/h. So you stops emergently and wait for the truck to pass.",
        "3-22":"On a bright sunny day, you are driving on the left lane of a two-lane one-way concrete road at about 30km/h. You decide to make a lane change to the right lane. When you steer your steering wheel to the right and starts a lane change, you notice on your right mirror that there is a truck on the right lane almost parallel to your car (about 2 meters on your right behind, at your right blind spot), so you immediately reverse the steering wheel to go back to the left lane. The truck passes by and cut in your lane in front of you with a speed of about 50km/h. You make the lane change to the right after the truck finishes its lane change",
        "3-23":"On a sunny day, you are driving on the right lane of a two-lane one-way concrete road and want to merge in a one-way two-lane main road from left to right. You are 50 meters from the merge-in point, so you decelerate and stops before it. You notice from your left mirror that there are three cars driving on the main road from left to right. A SUV 70 meters away driving at 50km/h on main road's left lane (lane that far from you). A sport car 100 meters away driving at 80km/h on main road's right lane (on the lane near you). A truck 200 meters away driving at about 40-50km/h on main road's right lane as well. You make the lane merge to main road right after sport car and SUV pass by while the truck is about 70 meters from you. It has to decelerate to avoid colliding with your car.",
        "3-24":"On a dim afternoon, you are driving on the left lane of a two-lane one-way concrete road about 45km/h. There is a truck 100 meters ahead of you on the right lane driving at a speed of 40km/h. You notice that 300 meters ahead, your lane is ended and need to change to right lane before colliding to street curb. You accelerate to 70km/h, and manage to pass the truck and make a lane change RIGHT BEFORE the road ends.",
    }
]

const randomState = Math.floor(Math.random() * 2)

export {randomState, drivingText}