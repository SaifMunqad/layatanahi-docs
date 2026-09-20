# Features

##  Features of the system

This system possesses characteristics that set it apart from other systems.

###  Coordination between businesses

This system is fundamentally designed to enhance coordination and collaboration between businesses. Its primary objective is to create a structured environment where organizations can clearly identify both the resources available from other businesses and the needs that exist across the network. By facilitating this exchange of information, each business gains better visibility into potential opportunities for partnership, supply, and service provision. In turn, this promotes efficiency, reduces duplication of effort, and encourages mutually beneficial relationships. Ultimately, the system aims to build a more interconnected business ecosystem where companies can support one another, respond effectively to demand, and optimize their overall performance through shared knowledge and cooperation.

###  Cart Feature

The system includes a shopping cart feature that allows users to select and manage items before making a purchase. Users can browse available products and add their desired items to the cart, where they can review details such as quantity, price, and total cost. The cart provides flexibility by enabling users to update item quantities or remove products as needed. Once satisfied, users can proceed to the checkout process, where the system calculates the final amount and confirms the purchase. This functionality improves user experience by allowing convenient and organized purchasing, while also ensuring accurate order processing within the system.

###  Notification Feature

The system also has a notification feature to keep users updated about important information. Whenever a user receives a notification, it appears in their account and stays there until they check it. If the user opens and reads the notification, the system will automatically delete it after 7 days. This helps keep the notification section clean and not overcrowded. However, if a notification is not read, it will not be deleted, so the user can still see it later. This way, the system makes sure that users do not miss any important messages while also managing space efficiently.

###  Request and Transaction Confirmation System

The system includes a request-based feature that manages transactions between users in a structured way. When a user sells a product or service to another user, an invoice is generated and sent as a request to the buyer. The buyer then reviews the request and, after receiving the item, can accept it and proceed with the payment.
Once the payment is made, a confirmation request is sent back to the seller. The seller then verifies whether the payment has been received. If the payment is confirmed, the seller accepts the request and selects the appropriate account where the amount will be deposited. This two-step confirmation process ensures that both the delivery of goods and the payment are verified, reducing errors and increasing trust between users within the system.

###  Online Payment and Verification System (Hesab Pay)

The system supports online payments with multiple layers of verification to ensure security and accuracy. When a user chooses to pay using Hesab Pay, the payment process is initiated using a specific invoice number. The system sends the invoice details, including the invoice number, price, and product information, to Hesab Pay for processing.
After verification, Hesab Pay returns a payment URL, which is provided to the user so they can complete the payment. Once the payment is made, there is no immediate direct response confirming the transaction. Instead, Hesab Pay sends a callback response to the system containing the invoice number and item details in JSON format, along with a signature and payment status.
The system then verifies the authenticity of the response by validating the signature using the provided URL. After successful verification, the JSON data is stored within the system. This allows the system to accurately track who made the payment, to whom the payment was made, and which invoice the transaction is associated with. This process ensures secure, reliable, and traceable online payments.

###  Tax Calculation

The system is designed to calculate three main types of taxes, and all tax payments are recorded as expenses. These taxes are calculated based on simple rules to help businesses understand their financial obligations.
First, Corporate Income Tax (CIT) is calculated using the taxable profit. The taxable profit is determined by subtracting the purchase cost from the selling price. For example, if the selling price is 1,500 AFN and the purchase cost is 1,000 AFN, the profit is 500 AFN. A tax rate of 20% is then applied, resulting in a tax of 100 AFN.
Second, Business Receipt Tax (BRT) is applied to small businesses as an alternative to CIT. This tax is calculated as a percentage of total sales, usually between 1% and 4%. For example, applying a 2% rate on total sales of 1,500 AFN results in a tax of 30 AFN.
Third, Value Added Tax (VAT) is calculated based on the difference between output tax and input tax. Output tax is the VAT collected from sales, while input tax is the VAT paid on purchases. For instance, if the output tax is 150 AFN and the input tax is 100 AFN (10% of 1,000 AFN), the net VAT payable is 50 AFN.

###  Employee and Payroll Management

The system includes an employee and payroll management feature. A business administrator can send employment requests to users within the system. Once a user accepts the request, they become an employee of that business. The system is designed so that an employee can only be associated with one business at a time and cannot work for multiple businesses simultaneously.
In addition to employee management, the system also has its own payroll system to handle salary-related processes. This helps businesses manage employee payments in an organized and consistent way, ensuring that payroll operations are properly tracked and recorded within the system.

###  Exchange Rate

The system has an uses an API for Exchange rate feature that is linked to the global market. This API converts different currencies into Afghan Afghani (AFN) and store the results in the system database with unique Ids. The exchange rates are automatically updated every hour using a scheduled queue, ensuring that all financial calculations in the system that helps system remain accurate and up to date.

###  Google Authentication

The system uses Google Authentication for user login. This allows users to sign in easily using their Google accounts instead of creating a separate username and password. It makes the login process faster and more convenient for users.
When a user logs in, Google verifies their identity and then allows access to the system. This also adds an extra layer of security since the authentication is handled by Google’s secure login system. Overall, it helps improve both security and user experience by simplifying the sign-in process.

###  Facebook Authentication

The system also supports Facebook Authentication so users can sign in through their Facebook accounts. This provides an additional login option that is quick, familiar, and user-friendly. By allowing users to authenticate with Facebook, the system improves accessibility and convenience while maintaining a secure and trusted sign-in flow.

###  Customer- Vendor Management

The system provides a management feature that allows users to handle both customers and vendors in an organized way. Each user can maintain their own list of customers and vendors, including those who are registered in the application as well as those who are not. This flexibility ensures that all business relationships can be recorded within the system.
Users can view a complete list of customers and vendors at any time, making it easy to track and manage their information. The system allows users to add new records, update existing details, and delete entries that are no longer needed. By combining both customer and vendor management in one place, the system helps users efficiently organize their business contacts and maintain accurate records for daily operations.

###  Expenses

In the system, expenses are organized into different categories such as meals, rent, office costs, supplies, and repairs. This categorization helps keep financial records clear and well-structured. Whenever an expense occurs, it is recorded under its relevant category based on its type. For example, a meal expense is added under the meal category, while office-related costs are recorded under office expenses. This approach makes it easier to track, analyze, and manage all business expenses in an organized way.

###  Income

The system includes an income management feature that helps businesses record, monitor, and analyze all incoming revenue generated from sales, services, and other business activities. Income entries can be categorized by source, date, and amount so users can clearly understand where their money is coming from. This feature supports financial reporting, helps track cash flow, and allows businesses to compare income against expenses for better decision-making and planning.
