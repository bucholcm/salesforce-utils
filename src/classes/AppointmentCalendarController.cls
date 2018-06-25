public with sharing class AppointmentCalendarController {
    
    @AuraEnabled
    public static String getAppointments(Id doctorId, Id specializationId) {
        String query = 'SELECT Id, Name, Subject__c, Start_Date__c, End_Date__c FROM Appointment__c ';
        if (doctorId != null) {
            if (doctorId.getSobjectType().getDescribe().getKeyPrefix() == Specialization__c.getSObjectType().getDescribe().getKeyPrefix()) {
                specializationId = doctorId;
            } else {
                query += 'WHERE Physician__c = \'' + String.escapeSingleQuotes(doctorId) + '\'';
            }
        }
        if (specializationId != null) {
            query += 'WHERE Specialization__c = \'' + String.escapeSingleQuotes(specializationId) + '\'';
        }
        query += ' LIMIT 500';
        System.debug(query);
        List<Appointment__c> results = Database.query(query);
        return JSON.serialize(results);
    }

}