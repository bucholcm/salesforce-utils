({
	afterScriptsLoaded : function(component, event, helper) {
        helper.initCalendar(component);
        helper.fetchEvents(component);
    },
    handleRefreshEvent : function(component, event, helper) {
        component.set('v.recordId', event.getParam('doctorId'));
        if (!component.find('calendar').getElement().innerHTML && component.get('v.ready')) {
            helper.initCalendar(component);
        }
        helper.fetchEvents(component);
    }
})