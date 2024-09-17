// const messages = (mess)=>{
//     const tests = {};
//
//     tests.mess1=()=>{
//         console.log(`${mess}1`)
//     }
//
//     tests.mess2=()=>{
//         console.log(`${mess}1`)
//     }
//
// }

// const person={
//     name:"Eugene",
//     age:20,
//     address:"Siaya"
// }
//
// const item ="name"
//
// console.log(person[item]);

const {formatDate} = require("./utils/formatDate");
const roles = {
    admin: ['manage_all'], // Full access to all operations
    principal: [
        'manage_school',
        'make_policy',
        'decision_making',
        'manage_staff'
    ],
    vicePrincipal: [
        'assist_principal',
        'oversee_academics',
        'oversee_discipline'
    ],
    administrativeStaff: [
        'handle_clerical_tasks',
        'manage_communication',
        'schedule_activities',
        'coordinate_school_activities'
    ],

    classTeacher: [
        'mark_register',
        'add_learner',
        'manage_discipline',
        'release_learner',
        'view_class_timetable',
        'borrow_books'
    ]
}

// const userRole=["classTeacher","administrativeStaff"]
// let aggregatedPrivileges = new Set();
//
// userRole.forEach(role => {
//     const rolePrivileges = roles[role] || [];
//     rolePrivileges.forEach(privilege => aggregatedPrivileges.add(privilege));
// });
//
// aggregatedPrivileges = Array.from(aggregatedPrivileges);
//
// const requiredPrivileges = ['oversee_discipline','coordinate_school_activities']
//
// const hasPrivilege = requiredPrivileges.some(privilege => aggregatedPrivileges.includes(privilege) || aggregatedPrivileges.includes('manage_all'));
//
// console.log(hasPrivilege)

// const items=[
//     {name:"Eugene",age:20},
//     {name:"Eugene",age:21},
//     {name:"Eugene",age:22},
//     {name:"Eugene",age:23},
//     {name:"Eugene",age:23},
//     {name:"Eugene",age:24},
//     {name:"Eugene",age:25}
// ]
//
// const total = items.reduce((add,item)=>
//     add+item.age,0
// )
//
// const date = formatDate()
//
// console.log(date)
//
// console.log(total)

// let trial = 20
//
// trial -= 5
//
// console.log(trial)



// const trials = {
//     name:"Eugene",
//     age:20,
//     money:1000,
//     income:[
//         {id:2,money:100,name:"EUR"},
//         {id:5,money:100,name:"EUR"},
//         {id:4,money:200,name:"EUR"},
//         {id:3,money:30,name:"EUR"},
//     ]
// }
//
// const index = trials.income.findIndex(item=>item.id===2)
//
// trials.money -= trials.income[index].money
//
// trials.income.splice(index,1)
//
// console.log(trials)

const add = (a,b) => {
  return `${a}${b}`;
}
const multiply = (a,b) => {
  return a * b;
}

const subtract = (a,b)=>{
    return a-b
}

const all = {
    add,
    multiply,
    subtract
}

const id = 112233

console.log(all.add('/staff/read/',id))

const name = "Eugene"

console.log(name[0])