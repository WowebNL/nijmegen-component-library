Feature: Responsive table

    The responsive table should change when the with of the page changes

    Scenario: Mobile view - normal table

        Given I open the component "normal-table"
        When I set the browser viewport to 550px width by 400px height
        Then I expect the screenshot of "normal-table mobile" matches the web page

    Scenario: Mobile view - complex table

        Given I open the component "complex-table"
        When I set the browser viewport to 550px width by 400px height
        Then I expect the screenshot of "complex-table mobile" matches the web page
