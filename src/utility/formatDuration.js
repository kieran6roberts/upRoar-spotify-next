function convertDurationFormat (time = 0) {
    const mins = Math.floor(time / 60);
    const seconds = time - mins * 60;
    const hours = Math.floor(time / 3600);

    return `${hours !== 0
              ? `${hours}:`
              : ""}
            ${mins !== 0
              ? `${mins.toFixed(0)}:`
              : "0:"}
            ${seconds <= 9
              ? `0${seconds.toFixed(0)}`
              : seconds.toFixed(0)}`;
}

export default convertDurationFormat;
