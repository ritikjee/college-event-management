const dateCompare = (startDate,endDate, date2) => {
    const date1 = new Date(startDate);
    const date3 = new Date(endDate);
    const date4 = new Date(date2);
    if(date4>date1&&date4<date3 ){
        return "ONGOING";
    }
    else if(date4<date1){
        return "UPCOMING";
    }
    else if(date4>date3){
        return "COMPLETED";
    }
    else{
        return "ERROR";
    }
}

export default dateCompare;