export default function SongSlab({title, artist, image, size})
{
    return (
        <div className="w-full">
            <div className="flex rounded-xl bg-[#283040] p-4 gap-4 mx-2">
                {/* img */}
                <img src={image} className="object-cover" style={{width: size, height: size}}/>
                {/* info */}
                <div className="flex flex-col justify-center">
                    <p className="font-alt font-bold text-white">{title}</p>
                    <p className="font-alt text-[#9B9B9B]">{artist}</p>
                </div>
            </div>
        </div>
    )
}