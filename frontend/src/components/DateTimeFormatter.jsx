
const DateTimeFormatter = ({dateString}) =>{
    if (!dateString) return null;

    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-IN",{
        day:"numeric",
        month:"long",
        year:"numeric",
        hour:"numeric",
        minute:"2-digit",
        hour12:true,
    });
    
    return <span>{formattedDate}</span>
}

export default DateTimeFormatter;