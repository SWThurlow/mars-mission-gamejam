const questions = [
    {
        info: "Satellites are objects that orbit planets, a moon is a natural satellite. Earth has one moon, Mars has 2 moons and Jupiter has a whopping 79 known moons!",
        question: "How many more moons does Jupiter have than Earth and Mars together?",
        questionType: "input",
        expectedAnswer: "76",
        explanation: "Earth and Mars together have 3 moons. If we take 3 from 79 we should get 76."
    },
    {
        info: "Our solar system has eight planets, they are,  in order: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune. The inner four planets are rocky planets and the outer four are gas giants.",
        question: "Which planet is the second closest gas giant to the sun?",
        questionType: "multiple",
        expectedAnswer: "Saturn",
        choices: ["Venus", "Uranus", "Earth", "Saturn"],
        explanation: "The gas planets are further from the sun than the four rocky planets. That means we are actually looking for the sixth planet from the sun. Which is Saturn."
    },
    {
        info: "Sound travels through the air by particles vibrating and colliding with other particles making them vibrate. Space is a vacuum, a vacuum is an area with nothing in it so the are no particles there, this means sound can not travel in space.",
        question: "Could an astronaut living on a space station hear a guitar if they were to play it?",
        questionType: "yes/no",
        expectedAnswer: "Yes",
        explanation: "A space station has air for an astronaut to live there this means that the sound can travel and they could hear themself playing the guitar. If they took the guitar outside the space station and played it they wouldn't be able to hear it in the vacuum of space."
    },
    {
        info: "Our solar system has four gas planets, Jupiter, Saturn, Uranus and Neptune. They are further from the sun and are much bigger than the rocky inner planets, each of them also has many moons. They are called gas planets as they are balls of hydrogen and helium. ",
        question: "Could you stand on the surface of one of the gas planets?",
        questionType: "yes/no",
        expectedAnswer: "No",
        explanation: "Because gases aren't solid you would sink right through the surface of a gas planet. It would be a bit like trying to stand in the air."
    },
    {
        info: "The Apollo 11 mission was the first time a human set foot on the moon, it was Neil Armstrong who took the first small step on the moon. It took Just over 4 days for them to reach the moon and they were there for just under a day, including a 7 hour sleep, before taking 3 days to return to earth.",
        question: "How many days did it take for the Apollo 11 mission to reach the moon, visit it's surface and return to Earth?",
        questionType: "input",
        expectedAnswer: "8",
        explanation: "We can count the time to reach the moon as 4 days and the time there as 1 day as was is slightly longer and the other is slightly shorter than a full day. This means to figure out how long it took we have to add 4, 1 and 3. 4 + 1 + 3 = 8"
    }, 
    {
        info: "The Earth sits at a slight angle in its orbit around the sun. This tilt in the Earths axis means that different parts of the Earth receive the suns most direct rays. When the North Pole tilts towards the sun it is summer in the Northern Hemisphere and when the South Pole tilts towards the sun it is summer in the Southern Hemisphere.",
        question: "What is it that causes the different seasons?",
        questionType: "multiple",
        expectedAnswer: "The tilt in the Earth's axis.",
        choices: ["The tilt in the Earth's axis.", "The Earth getting closer and further from the sun throughout the year.", "Father Christmas"],
        explanation: "The tilt in the Earth’s axis means that at different times of year different parts of the earth get more direct sunlight. When a part of the Earth is getting more sunlight it gets warmer(spring/summer) and when a part of the Earth gets less sunlight it tends to be colder(autumn/winter)."
    }
];

export {questions};