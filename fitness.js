var myFitness = [];

//Configure your settings here.
myFitness.myName = "Gil";
myFitness.labels = ["March","April","May","June","July","August","September"]; //6 month progress tracker

myFitness.bellyGoal = 32;
myFitness.bellyData = [36.5,35.25,34.5,34.0,34.0];


myFitness.chestGoal = 42;
myFitness.chestData = [40,40.5,41.0,41.25,41.25];

myFitness.bicepsGoal = 15;
myFitness.bicepsData = [14,14.25,14.5,14.5,14.5];

myFitness.weightGoal = 200;
myFitness.weightData = [180,175, 178,173,175];

myFitness.init = function()
{
	//Write out name
	this.customizePage();

	//Belly Goal
		belly = {
			labels : this.labels,
			datasets : [ this.getGoalDataSet(this.bellyArr), this.getProgressDataSet(this.bellyData)]
		};

		new Chart(document.getElementById("waist").getContext("2d")).Line(belly);
		document.getElementById("waist-status").innerHTML = this.determineProgress(this.bellyGoal, this.bellyData,"lower");

	//Chest Goal
		chest = {
			labels : this.labels,
			datasets : [ this.getGoalDataSet(this.chestArr), this.getProgressDataSet(this.chestData)]
		};

		new Chart(document.getElementById("chest").getContext("2d")).Line(chest);
		document.getElementById("chest-status").innerHTML = this.determineProgress(this.chestGoal, this.chestData, "higher");

	//Biceps Goal
		biceps = {
			labels : this.labels,
			datasets : [ this.getGoalDataSet(this.bicepsArr), this.getProgressDataSet(this.bicepsData)]
		};

		new Chart(document.getElementById("biceps").getContext("2d")).Line(biceps);
		document.getElementById("biceps-status").innerHTML = this.determineProgress(this.bicepsGoal, this.bicepsData, "higher");

	//Weight Goal
		weight = {
			labels : this.labels,
			datasets : [ this.getGoalDataSet(this.weightArr), this.getProgressDataSet(this.weightData)]
		};

		new Chart(document.getElementById("weight").getContext("2d")).Line(weight);
		document.getElementById("weight-status").innerHTML = this.determineProgress(this.weightGoal, this.weightData, "lower");

};

myFitness.customizePage = function()
{
	document.getElementById("title").innerHTML = '<span class="icon-296 pr10"></span>'+ this.myName + '\'s Fitness Tracker';
};

myFitness.initGoalArray = function(goal)
{
	a = [];
	for (var i = this.labels.length - 1; i >= 0; i--) {
		a.push(goal);
	}

	return a;
};

myFitness.getGoalDataSet = function(goal)
{
	return {
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,1)",
				pointColor : "rgba(220,220,220,1)",
				pointStrokeColor : "#fff",
				data : goal
			};
};

myFitness.getProgressDataSet = function(progress)
{
	return {
					fillColor : "rgba(151,187,205,0.5)",
					strokeColor : "rgba(151,187,205,1)",
					pointColor : "rgba(151,187,205,1)",
					pointStrokeColor : "#fff",
					data : progress
			};
};

myFitness.determineProgress = function (goal, data, type)
{

	if(type == "lower")
	{
		//Goals the have a downward number
		if(goal >= data[data.length-1])
			{
				//Reached goal!
				return "<span class='icon-368 text-success'></span> Nailed it!";

			}
			else if ( data[data.length-2] > data[data.length-1] )
			{
				//Making Progress
				left = data[data.length-1] - goal;

				return "<span class='icon-211 text-primary'></span> -"+ left +" inches to go!";
			}
			else
			{
				//No change or worse off
				return "<span class='icon-212 text-danger'></span> Keep at it!";
			}
	}
	else
	{
		//Goals with an upward number - bulking
		if(goal <= data[data.length-1])
			{
				//Reached goal!
				return "<span class='icon-368 text-success'></span> Nailed it!";

			}
			else if ( data[data.length-2] < data[data.length-1] )
			{
				//Making Progress
				left = goal - data[data.length-1];
				return "<span class='icon-211 text-primary'></span> " + left+ " inches to go!";
			}
			else
			{
				//No change or worse off
				return "<span class='icon-212 text-danger'></span> Keep at it!";
			}

	}

};

myFitness.bellyArr = myFitness.initGoalArray(myFitness.bellyGoal);
myFitness.chestArr = myFitness.initGoalArray(myFitness.chestGoal);
myFitness.bicepsArr = myFitness.initGoalArray(myFitness.bicepsGoal);
myFitness.weightArr = myFitness.initGoalArray(myFitness.weightGoal);

// A $( document ).ready() block.
$( document ).ready(function() {
    myFitness.init();
});
