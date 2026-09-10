
export default function Svg({
                                children,
                                className,
                                fill,
                                stroke,
                                viewBox = '0 0 24 24',
                                svgId,
                            }) {
    return (
        <svg
            className={className}
            fill={fill}
            stroke={stroke}
            viewBox={viewBox}
            aria-hidden="true"
            id={svgId}
        >
            {children}
        </svg>
    )
}
