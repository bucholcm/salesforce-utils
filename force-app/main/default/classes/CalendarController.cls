public with sharing class CalendarController {
    
    @AuraEnabled
    public static String getAppointments() {
        List<Event> results = [SELECT Id, Subject, StartDateTime, EndDateTime FROM Event LIMIT 500];
        return JSON.serialize(results);
    }

}