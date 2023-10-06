

// This has to show a table containing a full week 
// where movies can be added and added movies have to be shown for given week

const WeekCalendar = () => {
    const today = new Date().getDate();
    
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>{`${today}`}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>YIR</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default WeekCalendar;