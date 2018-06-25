({
	initCalendar : function(component) {  
        $(component.find('calendar').getElement()).fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            defaultView: 'agendaWeek',
            businessHours: {
              dow: [ 1, 2, 3, 4, 5 ],
              start: '8:00',
              end: '21:00',
            },
            editable: false,
            eventLimit: true,
            timezone: 'local',
            nowIndicator: true
        });
        component.set('v.ready', true);
    },
    fetchEvents : function(component) {
        var action = component.get('c.getAppointments');
        action.setParams({doctorId: component.get('v.recordId'), specializationId: component.get('v.specializationId')});
        action.setCallback(this, function(response) {
            var state = response.getState();
            var resultsToast = $A.get("e.force:showToast");
            if (component.isValid() && state === 'SUCCESS') {
                let appointments = JSON.parse(response.getReturnValue()).map(function (v) { 
                    return { title: v.Subject__c, start: moment.utc(v.Start_Date__c, 'YYYY-MM-DDTHH:mm:ssZ'), end: moment.utc(v.End_Date__c, 'YYYY-MM-DDTHH:mm:ssZ'), id: v.Id }
                });
                $(component.find('calendar').getElement()).fullCalendar('removeEvents');
                $(component.find('calendar').getElement()).fullCalendar('addEventSource', appointments);
            } else if (state === "ERROR") {
                resultsToast.setParams({
                    title: 'Error',
                    message: 'There was an error: ' + JSON.stringify(response.error)
                });
                resultsToast.fire();
            } else {
                console.log('Unknown problem, state: ' + response.state + ', error: ' + JSON.stringify(response.error));
            }
        });
         
        $A.enqueueAction(action); 
    }
})