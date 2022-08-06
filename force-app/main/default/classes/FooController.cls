public with sharing class FooController {
  @AuraEnabled(Cacheable=true)
  public static List<String> getFoos() {
    return new List<String>{ 'Foo-1', 'Foo-2' };
  }
}
