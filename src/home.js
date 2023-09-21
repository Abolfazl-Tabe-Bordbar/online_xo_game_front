import "./index.css";
import { socket } from './socket';
import { useEffect, useRef, useState } from "react";
import Swal from 'sweetalert2';



function Home() {


    let [enable_play, setEnable_play] = useState(false);

    let [caracter, setCaracter] = useState("");

    let [room_name, setRoom_name] = useState("");

    let [x_roll, setx_roll] = useState(true);
    let [o_roll, seto_roll] = useState(false);

    let [x_cols, setXcols] = useState([]);
    let [o_cols, setOcols] = useState([]);

    let timer_hour;
    let timer_minutes;
    let timer_seconds;
    let players_detail;


    // let x_cols = [];
    // let o_cols = [];

    let hour = 0;
    let minutes = 0;
    let seconds = 0;

    let playeing_time = 0;
    let playeing_time_interval;

    useEffect(() => {

        socket.on('enable', (res) => {
            setEnable_play(res.lock);
            setCaracter(res.caracter);
            setRoom_name(res.room_name);
        });

        socket.on('leve_enemy', (res) => {
            if (res.status) {
                Swal.fire({
                    icon: 'error',
                    text: res.message,
                });
            }
        });

        socket.on('change_roll', (res) => {



            for (let index = 1; index < 10; index++) {

                let father_element = document.getElementById(index);
                let element = father_element.children[1];
                element.classList.add("hidden");

                let element2 = father_element.children[0];
                element2.classList.add("hidden");

            }


            setEnable_play(res.lock);
            setx_roll(res.x_roll);
            seto_roll(res.o_roll);
            setXcols(res.x_cols);
            setOcols(res.o_cols);



            console.log(res.x_cols);

            res.x_cols.forEach((id) => {

                let father_element = document.getElementById(id)
                let element = father_element.children[1];
                element.classList.remove("hidden");

            });

            res.o_cols.forEach((id) => {
                let father_element = document.getElementById(id)
                let element = father_element.children[0];
                element.classList.remove("hidden");
            });


            if (res.x_win) {

                for (let index = 0; index < res.x_cols.length; index++) {
                    document.getElementById(res.x_cols[index]).classList.remove("bg-slate-500");
                    document.getElementById(res.x_cols[index]).classList.add("bg-green-500");
                }
                for (let index = 0; index < res.o_cols.length; index++) {
                    document.getElementById(res.o_cols[index]).classList.remove("bg-slate-500");
                    document.getElementById(res.o_cols[index]).classList.add("bg-red-500");
                }

                if (res.caracter == caracter) {
                    Swal.fire({
                        icon: 'success',
                        text: 'You are Win',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: 'You are Won',
                    });
                }

            } else if (res.o_win) {

                for (let index = 0; index < res.x_cols.length; index++) {
                    document.getElementById(res.o_cols[index]).classList.remove("bg-slate-500");
                    document.getElementById(res.o_cols[index]).classList.add("bg-green-500");
                }
                for (let index = 0; index < res.x_cols.length; index++) {
                    document.getElementById(res.x_cols[index]).classList.remove("bg-slate-500");
                    document.getElementById(res.x_cols[index]).classList.add("bg-red-500");
                }

                if (res.caracter == caracter) {
                    Swal.fire({
                        icon: 'success',
                        text: 'You are Win',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: 'You are Won',
                    });
                }
            }



        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
        timer_hour = document.getElementById("timer_hour");
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timer_minutes = document.getElementById("timer_minutes");
        // eslint-disable-next-line react-hooks/exhaustive-deps
        timer_seconds = document.getElementById("timer_seconds");
        // eslint-disable-next-line react-hooks/exhaustive-deps
        players_detail = document.getElementById("players_detail");


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

        return () => {


        };

    }, []);






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

    function check_win(gamer, id) {

        let msg = "None Of You Have Won And Game Reset";

        if (gamer == "x") {


            let cols = [];

            x_cols.forEach((item) => {
                cols.push(item);
            });

            cols.push(id);



            for (let index = 0; index < win_option.length; index++) {

                let is_ok = 0;



                for (let index2 = 0; index2 < win_option[index].length; index2++) {

                    if (win_option[index][index2] == cols[index2]) {
                        is_ok += 1;
                    }
                }

                if (is_ok == 3) {
                    msg = "Player X Win";
                }
            }

        } else if (gamer == "o") {

            let cols = [];

            o_cols.forEach((item) => {
                cols.push(item);
            });

            cols.push(id);


            for (let index = 0; index < win_option.length; index++) {

                let is_ok = 0;

                for (let index2 = 0; index2 < win_option[index].length; index2++) {

                    if (win_option[index][index2] == cols[index2]) {
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

                    setXcols((prevState) => {
                        let new_data = [];
                        prevState.forEach(item => new_data.push(item));
                        new_data.push(id);
                        return new_data
                    });



                    if (x_cols.length + 1 == 3) {



                        if (check_win("x", id).search("Win") > 0) {

                            x_cols.push(id);


                            socket.emit('change_roll', {
                                x_roll: false,
                                o_roll: true,
                                x_cols,
                                o_cols,
                                x_win: true,
                                o_win: false,
                            });


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
                                text: "You are win",
                            });
                            clearInterval(playeing_time_interval);
                        } else {

                            let data_for_emit = [];
                            x_cols.forEach(item => data_for_emit.push(item));
                            data_for_emit.push(id);

                            socket.emit('change_roll', {
                                x_roll: false,
                                o_roll: true,
                                x_cols: data_for_emit,
                                o_cols
                            });

                            setEnable_play(true);
                            setx_roll(false);
                            seto_roll(true);

                        }

                    } else {

                        let data_for_emit = [];
                        x_cols.forEach(item => data_for_emit.push(item));
                        data_for_emit.push(id);

                        socket.emit('change_roll', {
                            x_roll: false,
                            o_roll: true,
                            x_cols: data_for_emit,
                            o_cols
                        });
                        setEnable_play(true);
                        setx_roll(false);
                        seto_roll(true);
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
                    setOcols((prevState) => {
                        let new_data = [];
                        prevState.forEach(item => new_data.push(item));
                        new_data.push(id);
                        return new_data
                    });

                    if (o_cols.length + 1 == 3) {

                        if (check_win("o", id).search("Win") > 0) {

                            socket.emit('change_roll', {
                                x_roll: true,
                                o_roll: false,
                                x_cols,
                                o_cols,
                                x_win: false,
                                o_win: true,
                            });

                            o_cols.push(id);

                            for (let index = 0; index < o_cols.length; index++) {
                                document.getElementById(o_cols[index]).classList.remove("bg-slate-500");
                                document.getElementById(o_cols[index]).classList.add("bg-green-500");
                            }
                            for (let index = 0; index < x_cols.length; index++) {
                                document.getElementById(x_cols[index]).classList.remove("bg-slate-500");
                                document.getElementById(x_cols[index]).classList.add("bg-red-500");
                            }
                            Swal.fire({
                                icon: 'success',
                                text: "You are win",
                            })
                            clearInterval(playeing_time_interval);
                        } else {

                            let data_for_emit = [];
                            o_cols.forEach(item => data_for_emit.push(item));
                            data_for_emit.push(id);

                            socket.emit('change_roll', {
                                x_roll: true,
                                o_roll: false,
                                x_cols,
                                o_cols: data_for_emit
                            });
                            setEnable_play(true);
                            setx_roll(true);
                            seto_roll(false);

                        }

                    } else {

                        let data_for_emit = [];
                        o_cols.forEach(item => data_for_emit.push(item));
                        data_for_emit.push(id);

                        socket.emit('change_roll', {
                            x_roll: true,
                            o_roll: false,
                            x_cols,
                            o_cols: data_for_emit
                        });
                        setEnable_play(true);
                        setx_roll(true);
                        seto_roll(false);
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


    return (
        <>
            <header className="w-full text-white text-2xl font-bold text-center block my-5">Welcome To My XO Game</header>

            <main className="w-11/12 h-auto relative  mx-auto flex flex-col-reverse md:flex-row justify-between items-center">

                <section
                    className="w-10/12 md:w-6/12 relative mx-auto rounded-lg h-[500px] bg-yellow-400 shadow shadow-slate-50 grid grid-rows-3 grid-cols-3 gap-5 box-border p-5">

                    <button id="1" onClick={e => draw(1, e)}
                        className="w-full h-full bg-slate-500 flex justify-center box-border p-5 items-center rounded-md col-span-1 hover:bg-slate-400">
                        <img src="/images/o.svg" className="w-full h-full hidden" alt="" />
                        <img src="/images/x.svg" className="w-full h-full hidden" alt="" />
                    </button>


                    <button id="2" onClick={e => draw(2, e)}
                        className="w-full h-full bg-slate-500 flex justify-center box-border p-5 items-center rounded-md col-span-1 hover:bg-slate-400">
                        <img src="/images/o.svg" className="w-full h-full hidden" alt="" />
                        <img src="/images/x.svg" className="w-full h-full hidden" alt="" />
                    </button>

                    <button id="3" onClick={e => draw(3, e)}
                        className="w-full h-full bg-slate-500 flex justify-center box-border p-5 items-center rounded-md col-span-1 hover:bg-slate-400">
                        <img src="/images/o.svg" className="w-full h-full hidden" alt="" />
                        <img src="/images/x.svg" className="w-full h-full hidden" alt="" />
                    </button>

                    <button id="4" onClick={e => draw(4, e)}
                        className="w-full h-full bg-slate-500 flex justify-center box-border p-5 items-center rounded-md col-span-1 hover:bg-slate-400">
                        <img src="/images/o.svg" className="w-full h-full hidden" alt="" />
                        <img src="/images/x.svg" className="w-full h-full hidden" alt="" />
                    </button>

                    <button id="5" onClick={e => draw(5, e)}
                        className="w-full h-full bg-slate-500 flex justify-center box-border p-5 items-center rounded-md col-span-1 hover:bg-slate-400">
                        <img src="/images/o.svg" className="w-full h-full hidden" alt="" />
                        <img src="/images/x.svg" className="w-full h-full hidden" alt="" />
                    </button>

                    <button id="6" onClick={e => draw(6, e)}
                        className="w-full h-full bg-slate-500 flex justify-center box-border p-5 items-center rounded-md col-span-1 hover:bg-slate-400">
                        <img src="/images/o.svg" className="w-full h-full hidden" alt="" />
                        <img src="/images/x.svg" className="w-full h-full hidden" alt="" />
                    </button>

                    <button id="7" onClick={e => draw(7, e)}
                        className="w-full h-full bg-slate-500 flex justify-center box-border p-5 items-center rounded-md col-span-1 hover:bg-slate-400">
                        <img src="/images/o.svg" className="w-full h-full hidden" alt="" />
                        <img src="/images/x.svg" className="w-full h-full hidden" alt="" />
                    </button>


                    <button id="8" onClick={e => draw(8, e)}
                        className="w-full h-full bg-slate-500 flex justify-center box-border p-5 items-center rounded-md col-span-1 hover:bg-slate-400">
                        <img src="/images/o.svg" className="w-full h-full hidden" alt="" />
                        <img src="/images/x.svg" className="w-full h-full hidden" alt="" />
                    </button>

                    <button id="9" onClick={e => draw(9, e)}
                        className="w-full h-full bg-slate-500 flex justify-center box-border p-5 items-center rounded-md col-span-1 hover:bg-slate-400">
                        <img src="/images/o.svg" className="w-full h-full hidden" alt="" />
                        <img src="/images/x.svg" className="w-full h-full hidden" alt="" />
                    </button>


                    {
                        enable_play
                            ?

                            <section className="w-full h-full bg-slate-300/80 flex justify-center items-center rounded-lg absolute top-0">
                                <img src="/images/lock.svg" className="w-28 h-28 " alt="" />
                            </section>

                            :
                            ""
                    }

                </section>

                <section className="w-full md:w-4/12 box-border p-5 h-auto md:h-[300px] flex flex-col justify-start items-center">

                    <div className="w-full flex  justify-between items-center text-white text-lg">
                        <div className="flex flex-col justify-center items-start">
                            <span>Caracter : {caracter}</span>
                            <span>Room Name : {room_name}</span>
                        </div>

                        <div className=" gap-3 h-12 flex justify-around items-center">
                            <div id="timer_hour"
                                className="bg-blue-400 rounded-full w-[40px] h-10 flex justify-center items-center text-white text-sm font-bold">
                                0 </div>:
                            <div id="timer_minutes"
                                className="bg-blue-400 rounded-full w-[40px] h-10 flex justify-center items-center text-white text-sm font-bold">
                                0 </div>:
                            <div id="timer_seconds"
                                className="bg-blue-400 rounded-full w-[40px] h-10 flex justify-center items-center text-white text-sm font-bold">
                                0 </div>
                        </div>

                    </div>

                    <ul id="players_detail" className="list-decimal text-white text-lg w-full"></ul>
                </section>




            </main>


        </>
    )


}

export default Home;