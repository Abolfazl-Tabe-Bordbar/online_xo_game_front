let timer_hour = document.getElementById("timer_hour");
let timer_minutes = document.getElementById("timer_minutes");
let timer_seconds = document.getElementById("timer_seconds");
let players_detail = document.getElementById("players_detail");


// create Gameer Details
let create_li = document.createElement("li");
let create_div = document.createElement("div");
create_div.classList.add("w-full", "flex", "justify-between", "items-center", "text-white", "text-lg");
let create_span_player_name = document.createElement("span");
create_span_player_name.classList.add("text-slate-200", "w-full", "text-left", "my-2");
create_span_player_name.innerHTML = "Player x is playing...";
let create_span_player_time = document.createElement("span");
create_span_player_time.id = "play";
create_span_player_time.innerHTML = "s0";

create_div.appendChild(create_span_player_name);
create_div.appendChild(create_span_player_time);

create_li.appendChild(create_div);

players_detail.appendChild(create_li);

// -----------------------------------------------------------------

let hour = 0;
let minutes = 0;
let seconds = 0;

let playeing_time = 0;
let playeing_time_interval;
playeing_time_interval = setInterval(() => {
    playeing_time += 1;
    document.getElementById("play").innerHTML = "s" + playeing_time;
}, 1000)

setInterval(function () {
    seconds++;
    timer_seconds.innerHTML = seconds;
    timer_minutes.innerHTML = minutes;
    timer_hour.innerHTML = hour;
    if (seconds == 60) {
        minutes += 1;
        seconds = 0;
    } else if (minutes == 60) {
        hour += 1;
        minutes = 0;
    }
}, 1000);

// --------------------------------------


let x_roll = true;
let o_roll = false;


let x_cols = [];
let o_cols = [];


let win_option = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [1, 9, 5],
    [1, 3, 2],
    [1, 7, 4],
    [2, 5, 8],
    [2, 8, 5],
    [2, 3, 1],
    [2, 1, 3],
    [3, 5, 7],
    [3, 7, 5],
    [3, 2, 1],
    [3, 1, 2],
    [3, 6, 9],
    [3, 9, 6],
    [4, 5, 6],
    [4, 6, 5],
    [4, 1, 7],
    [4, 7, 1],
    [5, 2, 8],
    [5, 8, 2],
    [5, 4, 6],
    [5, 6, 4],
    [5, 3, 7],
    [5, 7, 3],
    [5, 1, 9],
    [5, 9, 1],
    [6, 4, 5],
    [6, 5, 4],
    [6, 3, 9],
    [6, 9, 3],
    [7, 4, 1],
    [7, 1, 4],
    [7, 8, 9],
    [7, 9, 8],
    [7, 3, 5],
    [7, 5, 3],
    [8, 5, 2],
    [8, 2, 5],
    [8, 9, 7],
    [8, 7, 9],
    [9, 8, 7],
    [9, 7, 8],
    [9, 6, 3],
    [9, 3, 6],
    [9, 5, 1],
    [9, 1, 5],
];

function check_win(gamer) {

    let msg = "None Of You Have Won And Game Reset";

    if (gamer == "x") {

        for (let index = 0; index < win_option.length; index++) {

            let is_ok = 0;

            for (let index2 = 0; index2 < win_option[index].length; index2++) {

                if (win_option[index][index2] == x_cols[index2]) {
                    is_ok += 1;
                }
            }

            if (is_ok == 3) {
                msg = "Player X Win";
            }
        }

    } else if (gamer == "o") {

        for (let index = 0; index < win_option.length; index++) {

            let is_ok = 0;

            for (let index2 = 0; index2 < win_option[index].length; index2++) {

                if (win_option[index][index2] == o_cols[index2]) {
                    is_ok += 1;
                }
            }

            if (is_ok == 3) {
                msg = "Player O Win";
            }
        }
    }

    return msg


}

function CreateElement(roll) {

    let create_li = document.createElement("li");
    let create_div = document.createElement("div");
    create_div.classList.add("w-full", "flex", "justify-between", "items-center", "text-white", "text-lg");
    let create_span_player_name = document.createElement("span");
    create_span_player_name.classList.add("text-slate-200", "w-full", "text-left", "my-2");
    create_span_player_name.innerHTML = "Player " + roll + " is playing...";
    let create_span_player_time = document.createElement("span");
    create_span_player_time.innerHTML = "s0";

    document.getElementById("play").id = " ";
    create_span_player_time.id = "play";
    playeing_time = 0;

    create_div.appendChild(create_span_player_name);
    create_div.appendChild(create_span_player_time);

    create_li.appendChild(create_div);

    players_detail.appendChild(create_li);

}

function draw(id, event) {

    if (x_roll) {

        let father_element = document.getElementById(id)
        let element = father_element.children[1];


        if (x_cols.indexOf(parseInt(id)) >= 0) {

            if (x_cols.length == 3) {

                element.classList.add("hidden");

                const index = x_cols.indexOf(id);
                if (index > -1) { 
                    x_cols.splice(index, 1); 
                }

               
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This Cell Is Taken By Player X!',
                });
            }
        } else if (o_cols.indexOf(parseInt(id)) >= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This Cell Is Taken By Player O!',
            });
        } else if (x_cols.indexOf(parseInt(id)) < 0 && o_cols.indexOf(parseInt(id)) < 0) {

            if (x_cols.length < 3) {

                element.classList.remove("hidden");
                x_cols.push(parseInt(id));

                if (x_cols.length == 3) {

                    if (check_win("x").search("Win") > 0) {
                        for (let index = 0; index < x_cols.length; index++) {
                            document.getElementById(x_cols[index]).classList.remove("bg-slate-500");
                            document.getElementById(x_cols[index]).classList.add("bg-green-500");
                        }
                        for (let index = 0; index < o_cols.length; index++) {
                            document.getElementById(o_cols[index]).classList.remove("bg-slate-500");
                            document.getElementById(o_cols[index]).classList.add("bg-red-500");
                        }
                        Swal.fire({
                            icon: 'success',
                            text: check_win("x"),
                        }).then(() => {
                            location.reload();
                        });
                        clearInterval(playeing_time_interval);
                    } else {
                       

                        CreateElement("o");
                        x_roll = false;
                        o_roll = true;

                    }

                } else {

                    CreateElement("o");
                    x_roll = false;
                    o_roll = true;
                }
            } else {

                if (o_cols.indexOf(parseInt(id)) >= 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This Cell Is Taken By Player O!',
                    });
                } else if (x_cols.indexOf(parseInt(id)) >= 0) {

                    element.classList.add("hidden");

                    const index = x_cols.indexOf(id);
                    if (index > -1) { 
                        x_cols.splice(index, 1); 
                    }

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'All your pieces are used, take one of them and try again.',
                    });
                }

            }


        }


    } else if (o_roll) {

        let father_element = document.getElementById(id)
        let element = father_element.children[0];


        if (x_cols.indexOf(parseInt(id)) >= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'This Cell Is Taken By Player X!',
            });

        } else if (o_cols.indexOf(parseInt(id)) >= 0) {
            if (o_cols.length == 3) {

                element.classList.add("hidden");

                const index = o_cols.indexOf(id);
                if (index > -1) {
                    o_cols.splice(index, 1); 
                }

                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This Cell Is Taken By Player O!',
                });
            }
        } else if (x_cols.indexOf(parseInt(id)) < 0 && o_cols.indexOf(parseInt(id)) < 0) {
            if (o_cols.length < 3) {

                element.classList.remove("hidden");
                o_cols.push(parseInt(id));

                if (o_cols.length == 3) {

                    if (check_win("o").search("Win") > 0) {
                        for (let index = 0; index < x_cols.length; index++) {
                            document.getElementById(o_cols[index]).classList.remove("bg-slate-500");
                            document.getElementById(o_cols[index]).classList.add("bg-green-500");
                        }
                        for (let index = 0; index < x_cols.length; index++) {
                            document.getElementById(x_cols[index]).classList.remove("bg-slate-500");
                            document.getElementById(x_cols[index]).classList.add("bg-red-500");
                        }
                        Swal.fire({
                            icon: 'success',
                            text: check_win("o"),
                        }).then(() => {
                            location.reload();
                        });
                        clearInterval(playeing_time_interval);
                    } else {
                        
                        CreateElement("x");
                        x_roll = true;
                        o_roll = false;

                    }

                } else {

                    CreateElement("x");
                    x_roll = true;
                    o_roll = false;
                }
            } else {

                if (x_cols.indexOf(parseInt(id)) >= 0) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'This Cell Is Taken By Player X!',
                    });
                } else if (o_cols.indexOf(parseInt(id)) >= 0) {

                    element.classList.add("hidden");

                    const index = o_cols.indexOf(id);
                    if (index > -1) { 
                        o_cols.splice(index, 1); 
                    }

                   
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'All your pieces are used, take one of them and try again.',
                    });
                }

            }

        }


    }
}

