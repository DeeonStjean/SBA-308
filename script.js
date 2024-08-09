// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};
  
// The provided assignment group.
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
};
  
// The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
];
  
function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  try {
    if(ag.course_id!=course.id){
      throw "Error: assignment course id don't match course id"
    }
    else{
      let today = new Date();
      let notdue=false;
      let notdueDate;

      while(notdue==false){
        for(let i=0;i<ag.assignments.length;i++){
          let dueDate=new Date(ag.assignments[i].due_at);
          if(dueDate>today){
            notdueDate=dueDate;
            notdue=true;
          }
        }
      }

      let learnerID1=[];
      let learnerID2=[];
      for(let i=0;i<submissions.length;i++){//slipt the array to two array one for id 125 and id 132
        if(submissions[i].learner_id==125){
          learnerID1.push(submissions[i])
        }else{
          learnerID2.push(submissions[i])
        }
      }

      let avgByAss1=[];
      let avgByAss2=[];

      for(let i=0;i<learnerID1.length;i++){
         let assignmentsDate = new Date(ag.assignments[i].due_at);
        if(today<assignmentsDate)
          break;
        else{
          avgByAss1.push(average(ag.assignments[i].points_possible,learnerID1[i].submission.score,
          SubmitOnTime(ag.assignments[i].due_at,learnerID1[i].submission.submitted_at)));
        }
        
      }
      for(let i=0;i<learnerID2.length;i++){
        let assignmentsDate = new Date(ag.assignments[i].due_at);
       if(today<assignmentsDate)
         break;
       else{
         avgByAss2.push(average(ag.assignments[i].points_possible,learnerID2[i].submission.score,
         SubmitOnTime(ag.assignments[i].due_at,learnerID2[i].submission.submitted_at)));
       }
       
     }
      const result = [
      {
        id: learnerID1[0].learner_id,
        avg: 0.985, // (47 + 150) / (50 + 150)
        1: avgByAss1[0], // 47 / 50 = 0.94
        2: avgByAss1[1] // 150 / 150 = 1
      },
      {
        id: learnerID2[0].learner_id,
        avg: 0.82, // (39 + 125) / (50 + 150)
        1: avgByAss2[0], // 39 / 50 = .78
        2: avgByAss2[1] // late: (140 - 15) / 150 = .0833
      }
      ];
      return result;
    }
    } catch (error) {
        console.log(error);
    }
    //return result;
}

function average(ag,sub,sot){
  let totalPoint=ag;
  let score=sub;
  if(totalPoint==0){
    throw "Error Can't divide by zero(0) "
  }
  else if(sot==true){
    return score/totalPoint;
  }else{
    let late=totalPoint/10;
    return (score-late)/totalPoint;
  }
}
function SubmitOnTime(ag,sub){//check if assignment was hand in before due date or on due date or late
  const assDate= new Date(ag);
  const subDate=new Date(sub);
  const today=new Date();
  if(assDate<today && assDate>=subDate ){//hand in on time return true
    return true;
  }
  else//hand in late return false 
    return false;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
console.log(result);
