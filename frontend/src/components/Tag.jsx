

export default function Tag(name) {
    return (
        <div className='flex flex-row items-center gap-2 px-2 py-1 rounded-full bg-yellow-20'>
            <div className='text-xs font-bold'>
                {name}
            </div>
        </div>
    )
}
