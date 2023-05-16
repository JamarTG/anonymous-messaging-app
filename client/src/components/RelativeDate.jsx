import formatDistance from 'date-fns/formatDistance'

export default function RelativeDate({date}) {
    const result = formatDistance( date, Date.now(), {addSuffix: true})
    
    return (
        <div className=' text-xs ml-auto'>
            <p>{result}</p>
        </div>
    )
}