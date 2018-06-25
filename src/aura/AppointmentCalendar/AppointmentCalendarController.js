({
	afterScriptsLoaded : function(component, event, helper) {
        helper.initCalendar(component);
        helper.fetchEvents(component);
    },
    handleRefreshEvent : function(component, event, helper) {
        component.set('v.recordId', event.getParam('doctorId'));
        component.set('v.specializationId', event.getParam('specializationId'));
        if (!component.find('calendar').getElement().innerHTML && component.get('v.ready')) {
            helper.initCalendar(component);
        }
        helper.fetchEvents(component);
    }
})