export function StarRatingDisplay({rating}) {
    const max = 5;
    const starPoint = "★".repeat(rating) + "☆".repeat(max - rating)
    
    return (
        <p className="text-yellow-500">{starPoint}</p>
    );
}
