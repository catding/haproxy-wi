function getChartData(server) {
    $.ajax({
        url: "options.py",
		data: {
			new_metrics: '1',
			server: server,
			token: $('#token').val()
		},
		type: "GET",
        success: function (result) {
     
            var data = [];

            data.push(result.chartData.curr_con);
            data.push(result.chartData.curr_ssl_con);
            data.push(result.chartData.sess_rate);
            data.push(result.chartData.max_sess_rate);
            data.push(result.chartData.server);

            var labels = result.chartData.labels;
            renderChart(data, labels, server);
        },
        error: function (err) {
            $("#loadingMessage").html("Error");
        }
    });
}
function renderChart(data, labels, server) {
    var ctx = document.getElementById(server)
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels.split(','),
            datasets: [
                {
                    label: 'curr_con',
                    data: data[0].split(','),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                },
                {
                    label: 'curr_ssl_con',
                    data: data[1].split(','),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                },
				 {
                    label: 'sess_rate',
                    data: data[2].split(','),
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                },
                {
                    label: 'max_sess_rate',
                    data: data[3].split(','),
                    borderColor: 'rgba(192, 192, 192, 1)',
                    backgroundColor: 'rgba(192, 192, 192, 0.2)',
                }
            ]
        },
        options: {
			title: {
				display: true,
				text: data[4],
				fontSize: 20,
				padding: 0,
			},
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    }
                }]
            },
			legend: {
				display: true,
				labels: {
					fontColor: 'rgb(255, 99, 132)'
				},
			}
        }
    });
}
$("#secIntervals").css("display", "none");	
function callIframe(url, callback) {
	$('#metrics_iframe').html('<iframe id="metrics" style="width:100%;height:100%;" />');
	$('iframe#metrics').attr('src', url);
	$('iframe#metrics').load(function() {
		callback(this);
	});
}

function loadMetrics() {

		$.get( "options.py?table_metrics=1&token="+$('#token').val(), function( data ) {
			$( "#table_metrics" ).html( data );
		});

}


