public with sharing class ExcelAccountController {
    @AuraEnabled
    public static String insertAccounts(List<Map<String, Object>> accountList) {
        List<Account> accountsToInsert = new List<Account>();

        for (Map<String, Object> row : accountList) {
            Account acc = new Account();

// Excel Cell: "Acme Corp"
//     ↓
// Map Value: Object containing "Acme Corp"
//     ↓
// row.get('Name'): Returns Object
//     ↓
// (String)row.get('Name'): Casts to String "Acme Corp"
//     ↓
// acc.Name: Receives String "Acme Corp"

            // if (row.containsKey('Name')) {
            //     acc.Name = (String)row.get('Name');
            // }
            // if (row.containsKey('Phone')) {
            //     acc.Phone = (String)row.get('Phone');
            // }
            // if (row.containsKey('Website')) {
            //     acc.Website = (String)row.get('Website');
            // }


            if (row.containsKey('Name')) {
           acc.Name = String.valueOf(row.get('Name'));
}
if (row.containsKey('Phone')) {
    acc.Phone = String.valueOf(row.get('Phone'));
}
if (row.containsKey('Website')) {
    acc.Website = String.valueOf(row.get('Website'));
}


            // Add more fields as needed
            accountsToInsert.add(acc);
        }

        if (!accountsToInsert.isEmpty()) {
            insert accountsToInsert;
            return 'Accounts inserted successfully: ' + accountsToInsert.size();
        } else {
            return 'No valid rows found to insert.';
        }
    }
}
