import Tag from './Tag';

export default function MarkCard(props) {
    const { id, name, description, date, course, numerator, denominator, percent, tags } = props.children;

    return (
        <div className='flex flex-row w-full px-5 py-5 rounded-2xl opacity-80 bg-white'>
            <div className='flex flex-col items-start justify-between w-full'>
                <div className='flex flex-row items-center gap-2'>
                    {tags.map(tag => <Tag name={tag}/>)}
                </div>
                <div className='h2'>{name}</div>
                <div className='h2'>{course}</div>
                <div className='h2'>{date}</div>
            </div>
            <div className='h2'>{description}</div>
        </div>
    )
}

