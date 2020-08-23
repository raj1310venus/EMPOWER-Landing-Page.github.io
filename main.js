
function color(n) {
  var color = ["#FE8E7B", "#C7DAC7", "#FAB800", "#E9EAEC", "#55CBD3", "#52A3DB", "#FAB800", "#E9EAEC", "#FF6787", "#55CBD3", "#FCDB7F", "#FF6787"];
  return color[n % color.length];
}
var padding = {top:0, right:50, bottom:0, left:95},
            w = 555 - padding.left - padding.right,
            h = 555 - padding.top  - padding.bottom,
            r = Math.min(w, h)/2,
            rotation = 0,
            oldrotation = 0,
            picked = 100000,
            oldpick = [];        
        var data = [
                    {"label":"JOURNEY", "value":" Click to Play!", "Question":"Well Done! Your Selection is: Journey Quiz"}, 
                    {"label":"ACHIEVEMENTS",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: Achievements Quiz"}, 
                    {"label":"LEADERBOARD",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: Leaderboard Quiz"}, 
                    {"label":"SAM",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: SAM Quiz"}, 
                    {"label":"EMMY",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: EMMY Quiz"}, 
                    {"label":"iPRAISE",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: iPRAISE Quiz"}, 
                    {"label":"LEARNING",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: Learning Quiz"}, 
                    {"label":"TIMELINE",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: Timeline Quiz"},
                    {"label":"EVENTS",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: Events Quiz"}, 
                    {"label":"NOTIFICATION",  "value":"Click to Play!",  "Question":"Well Done! Your Selection is: Notification Quiz"}, 
                    {"label":"BADGES", "value":"Click to Play!", "Question":"Well Done! Your Selection is: Badges Quiz"}, 
                    {"label":"MYFEED", "value":"Click to Play!", "Question":"Well Done! Your Selection is: Myfeed Quiz"}
                    
                    //comma
        ];
        var svg = d3.select('#chart')
            .append("svg")
            .data([data])
            .attr("width",  w + padding.left + padding.right)
            .attr("height", h + padding.top + padding.bottom);

        var container = svg.append("g")
            .attr("class", "chartholder")
            .attr("transform", "translate(" + (w/2 + padding.left) + "," + (h/2 + padding.top) + ")");

        var vis = container
            .append("g");
            
        var pie = d3.layout.pie().sort(null).value(function(d){return 1;});

        // declare an arc generator function
        var arc = d3.svg.arc().outerRadius(r);

        // select paths, use arc generator to draw
        var arcs = vis.selectAll("g.slice")
            .data(pie)
            .enter()
            .append("g")
            .attr("class", "slice");
            

        arcs.append("path")
            .attr("fill", function(d, i){ return color(i); })// pTH COLOR
            .attr("d", function (d) { return arc(d); });

        // add the text
        arcs.append("text").attr("transform", function(d){
                d.innerRadius = 0;
                d.outerRadius = r;
                d.angle = (d.startAngle + d.endAngle)/2;
                return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius -10) +")";
            })
            .attr("text-anchor", "end")
            .text( function(d, i) {
                return data[i].label;
            });

        


        function spin(d){
              
            container.on("click", null);

            //all slices have been seen, all done
            console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
            if(oldpick.length == data.length){
                console.log("done");
                container.on("click", null);
                return;
            }

            var  ps       = 360/data.length,
                 pieslice = Math.round(1440/data.length),
                 rng      = Math.floor((Math.random() * 1440) + 360);
                
            rotation = (Math.round(rng / ps) * ps);
            
            picked = Math.round(data.length - (rotation % 360)/ps);
            picked = picked >= data.length ? (picked % data.length) : picked;


            if(oldpick.indexOf(picked) !== -1){
                d3.select(this).call(spin);
                return;
            } else {
                oldpick.push(picked);
            }

            rotation += 0 - Math.round(ps/2);

            vis.transition()
                .duration(3000)
                .attrTween("transform", rotTween)
                .each("end", function(){

                    //mark Question as seen
                    
                    d3.select(".slice:nth-child(" + (picked + 1) + ") path")
                        .attr("fill", "#383C45");

                    //populate Question
                    d3.select("#Question button")
                        .text(data[picked].value);

                    d3.select("#Question h3")
                        .text(data[picked].Question);
                         document.getElementById("container2").style.display="block";
                        document.getElementById('btn1').style.display="block";

                    oldrotation = rotation;
                
                    container.on("click", spin);

                });
                 document.getElementById('container1').style.display="none";
                
        }

        
        
        function rotTween(to) {
          var i = d3.interpolate(oldrotation % 360, rotation);
          return function(t) {
            return "rotate(" + i(t) + ")";
          };
        }
        
        
        function getRandomNumbers(){
            var array = new Uint16Array(1000);
            var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);

            if(window.hasOwnProperty("crypto") && typeof window.crypto.getRandomValues === "function"){
                window.crypto.getRandomValues(array);
                console.log("works");
            } else {
                //no support for crypto, get crappy random numbers
                for(var i=0; i < 1000; i++){
                    array[i] = Math.floor(Math.random() * 100000) + 1;
                }
            }

            return array;
        }
         
/*Quiz Script*/
function start(d)
 {
    
  if ((data[picked].label) == "ACHIEVEMENTS") { 
    document.getElementById("btn1").disabled = true;
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Saving Timesheet for How many days in a streak would let you gain a Consistent Ranger Badge?",
    options: ["2 Days", "4 Days", "3 Days", "7 Days"],
    answer: 3
  }, {
    question: "A3 Approved by the continual Improvement team will let you gain Which of the following Badges?",
    options: ["Benevolent Guru", "Luminous Mind","Intellectual Maverick", "Consistent Ranger"],
    answer: 2
  }]
}
else if ((data[picked].label) == "JOURNEY") { 
    document.getElementById("btn1").disabled = true;
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Upload 2 Videos on HowTo?",
    options: ["Horsepower Burner","Intellectual Maverick", "Luminous Mind", "Benevolent Guru"],
    answer: 4
  }, {
    question: "A3 Approved by the continual Improvement team will let you gain Which of the following Badges?",
    options: ["Benevolent Guru", "Luminous Mind","Intellectual Maverick", "Consistent Ranger"],
    answer: 2
  }]
}
else if ((data[picked].label) == "LEADERBOARD") { 
    document.getElementById("btn1").disabled = true;
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Complete 2 Training to WIN?",
    options: ["Intellectual Maverick", "Luminous Mind", "Consistent Ranger", "Horsepower Burner"],
    answer: 1
  }, {
    question: "A3 Approved by the continual Improvement team will let you gain Which of the following Badges?",
    options: ["Benevolent Guru", "Luminous Mind","Intellectual Maverick", "Consistent Ranger"],
    answer: 2
  }]
}
else if ((data[picked].label) == "SAM") { 
    document.getElementById("btn1").disabled = true;
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Saving Timesheet for How many days in a streak would let you gain a Consistent Ranger Badge?",
    options: ["2 Days", "4 Days", "3 Days", "7 Days"],
    answer: 3
  }, {
    question: "Complete 2 Training to WIN?",
    options: ["Intellectual Maverick", "Luminous Mind", "Consistent Ranger", "Horsepower Burner"],
    answer: 1
  }]
}
else if ((data[picked].label) == "EMMY") { 
    document.getElementById("btn1").disabled = true;
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Saving Timesheet for How many days in a streak would let you gain a Consistent Ranger Badge?",
    options: ["2 Days", "4 Days", "3 Days", "7 Days"],
    answer: 3
  }, {
    question: "A3 Approved by the continual Improvement team will let you gain Which of the following Badges?",
    options: ["Benevolent Guru", "Luminous Mind","Intellectual Maverick", "Consistent Ranger"],
    answer: 2
  }]
}
else if ((data[picked].label) == "iPRAISE") { 
    document.getElementById("btn1").disabled = true;
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Complete 2 Training to WIN?",
    options: ["Intellectual Maverick", "Luminous Mind", "Consistent Ranger", "Horsepower Burner"],
    answer: 1
  }, {
   question: "Saving Timesheet for How many days in a streak would let you gain a Consistent Ranger Badge?",
    options: ["2 Days", "4 Days", "3 Days", "7 Days"],
    answer: 3
  }]
}
else if ((data[picked].label) == "LEARNING") { 
    document.getElementById("btn1").disabled = true;
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "On Time Availability for 3 Days In a Streak?",
    options: ["Intellectual Maverick","Consistent Ranger", "Luminous Mind", "None"],
    answer: 4
  }, {
    question: "A3 Approved by the continual Improvement team will let you gain Which of the following Badges?",
    options: ["Benevolent Guru", "Luminous Mind","Intellectual Maverick", "Consistent Ranger"],
    answer: 2
  }]
}
else if ((data[picked].label) == "TIMELINE") { 
    document.getElementById("btn1").disabled = true;
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Complete 2 Training to WIN?",
    options: ["Intellectual Maverick", "Luminous Mind", "Consistent Ranger", "Horsepower Burner"],
    answer: 1
  }, {
    question: "On Time Availability for 3 Days In a Streak?",
    options: ["Intellectual Maverick","Consistent Ranger", "Luminous Mind", "None"],
    answer: 4
  }]
}
else if ((data[picked].label) == "EVENTS") { 
    document.getElementById("btn1").disabled = true;
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Complete 2 Training to WIN?",
    options: ["Intellectual Maverick", "Luminous Mind", "Consistent Ranger", "Horsepower Burner"],
    answer: 1
  }, {
    question: "A3 Approved by the continual Improvement team will let you gain Which of the following Badges?",
    options: ["Benevolent Guru", "Luminous Mind","Intellectual Maverick", "Consistent Ranger"],
    answer: 2
  }]
}
else if ((data[picked].label) == "NOTIFICATION") { 
    document.getElementById("btn1").disabled = true;
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Saving Timesheet for How many days in a streak would let you gain a Consistent Ranger Badge?",
    options: ["2 Days", "4 Days", "3 Days", "7 Days"],
    answer: 3
  }, {
    question: "Complete 2 Training to WIN?",
    options: ["Intellectual Maverick", "Luminous Mind", "Consistent Ranger", "Horsepower Burner"],
    answer: 1
  }]
}
else if ((data[picked].label) == "MYFEED") { 
    document.getElementById("btn1").disabled = true;
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "Saving Timesheet for How many days in a streak would let you gain a Consistent Ranger Badge?",
    options: ["2 Days", "4 Days", "3 Days", "7 Days"],
    answer: 3
  }, {
    question: "A3 Approved by the continual Improvement team will let you gain Which of the following Badges?",
    options: ["Benevolent Guru", "Luminous Mind","Intellectual Maverick", "Consistent Ranger"],
    answer: 2
  }]
}
else{
    var quizconatiner= document.getElementById('container1');
    quizconatiner.style.display="block";
  var allQuestions = [{
    question: "A3 Approved by the continual Improvement team will let you gain Which of the following Badges?",
    options: ["Benevolent Guru", "Luminous Mind","Intellectual Maverick", "Consistent Ranger"],
    answer: 2
  },{
    question: "Upload 2 Videos on HowTo?",
    options: ["Horsepower Burner","Intellectual Maverick", "Luminous Mind", "Benevolent Guru"],
    answer: 4
  }]
};
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#nextquiz').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h3>Question: ' + (index + 1) + '/'+allQuestions.length +'</h3>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);


        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value= ' +  i  + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
      
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#nextquiz').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#nextquiz').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
       
        return score;


  }

 
};
