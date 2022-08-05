public with sharing class FooController {
    @AuraEnabled
    public static List<String> getFoos() {
        return new List<String> {
            'Foo-1',
            'Foo-2'
        };
    }
}
