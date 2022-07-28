
export const constructHistogram = (data) => {
    let formattedData = new Array(10).fill(0);
    for (const val of data)
    {
        switch (true)
        {
            case val<=0.1:
                formattedData[0]++;
                break;
            case val<=0.2:
                formattedData[1]++;
                break;
            case val<=0.3:
                formattedData[2]++;
                break;
            case val<=0.4:
                formattedData[3]++;
                break;
            case val<=0.5:
                formattedData[4]++;
                break;
            case val<=0.6:
                formattedData[5]++;
                break;
            case val<=0.7:
                formattedData[6]++;
                break;
            case val<=0.8:
                formattedData[7]++;
                break;
            case val<=0.9:
                formattedData[8]++;
                break;
            case val<=1.0:
                formattedData[9]++;
                break;
        }
    }

    return formattedData;
}
