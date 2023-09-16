

export default function Podium({color, height, width, children, number})
{

    return (
        <div    
            className="flex flex-col items-center gap-3 mt-auto"
            style={{
                width: width
            }}
        >
            {children}
            <div 
                className="flex rounded-t-xl justify-center pt-2"
                style={{
                    width: width,
                    height: height,
                    backgroundColor: color
                }}
            >
                <p className="font-main font-bold text-[80px] text-white">{number}</p>
            </div>
        </div>
    )
}