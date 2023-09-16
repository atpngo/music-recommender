// Fancy box image with a drop shadow accent

export default function SquareImage({src, size, color, number, box, fontSize})
{
    const intSize = parseInt(size.substring(0, size.length-2))
    const labelSize = Math.round(intSize/6)
    
    return (
        <div className="">
            {/* if number is defined, also add a thing */}
            {(number && fontSize) && <div 
                className="absolute rounded-br-xl flex items-center justify-center " 
                style={{
                    "backgroundColor": color,
                    "width": `${labelSize}px`,
                    "height": `${labelSize}px`,
                }}
            >
                <p 
                    className="text-white font-alt"
                    style={{
                        fontSize: fontSize
                    }}
                >{number}</p>
            </div>}
            <img src={src} className="object-cover" 
            style={{
                boxShadow: `${box} ${box} ${color}`,
                width: `${size}`,
                height: `${size}`,
            }}/> 
        </div>
    )
}