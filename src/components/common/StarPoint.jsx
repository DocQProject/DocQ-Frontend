import { useState } from "react";

export function StarRatingDisplay({ rating }) {
    const max = 5;
    const starPoint = "★".repeat(rating) + "☆".repeat(max - rating)

    return (
        <p className="text-yellow-500">{starPoint}</p>
    );
}

export function StarRatingInput({ setClickedStarNum }) {
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    const starScore = [1, 2, 3, 4, 5];

    function handleStarScore(score) {
        let star = [...clicked];
        for (let i = 1; i < 6; i++) {
            star[i] = i <= score ? true : false;
        }
        setClicked(star);
        setClickedStarNum(score + 1);
    }

    let clickedStarNum = clicked.filter(element => true === element).length;

    return (
        <div className="flex justify-center items-center">
            {
                starScore.map((score) => (
                    <img
                        key={score}
                        src={clicked[score] ? "src/assets/YellowStar.png" : "src/assets/GreyStar.png"}
                        className="w-15 h-15 me-20"
                        onClick={() => {
                            handleStarScore(score)
                        }}
                        alt="starIcon"
                    />
                ))
            }
        </div>
    );
}

