const grade = "E";

switch(grade) {
    case "A":
        console.log('A -> very good ');
        break;
    case "B":
        console.log("B->good , keep learning");
        break;
    case "C":
        console.log ("C-> you need to work hard ");
        break;
    case "D":
    case "E":
        console.log ('D->you are not good enough');
        break;
    default:
        console.log("Invalid grade");    
}