        // // Function to validate the form
        // function validate() {
        //     $('#invoiceForm').validate({
        //         rules: {
        //             companyName: "required",
        //             streetAddress: "required",
        //             city: "required",
        //             zipcode: {
        //                 required: true,
        //                 minlength: 7,
        //             },
        //             country: "required",
        //             phoneNumber: {
        //                 required: true,
        //                 digits: true,
        //                 minlength: 10
        //             },
        //             clientName: "required",
        //             InvoiceNumber: {
        //                 required: true,
        //                 digits: true,
        //                 minlength: 8
        //             },
        //             dueDate: "required",
        //             send_to: "required",
        //             amount: "required"
        //         },
        //         messages: {
        //             companyName: "Please enter your company name",
        //             streetAddress: "Please enter street address",
        //             city: "Please enter your city",
        //             zipcode: {
        //                 required: "Please enter your zipcode",
        //                 minlength: "Zipcode should be at least 7 characters long"
        //             },
        //             country: "Please enter your country",
        //             phoneNumber: {
        //                 required: "Please enter your phone number",
        //                 digits: "Please enter a valid phone number",
        //                 minlength: "Phone number should be at least 10 digits long"
        //             },
        //             clientName: "Please enter client name",
        //             InvoiceNumber: {
        //                 required: "Please enter invoice number",
        //                 digits: "Please enter a valid invoice number",
        //                 minlength: "Invoice number should be at least 8 digits long"
        //             },
        //             dueDate: "Please enter due date",
        //             send_to: "Please enter send to address",
        //             amount: "Please enter the amount"
        //         },
        //         submitHandler: function (form) {
        //             // Handle form submission here
        //             form.submit();
        //         }
        //     });
        // }
        
                // Function to print the invoice
                function printInvoice() {
                    // Hide other content and show the invoice
                    $(".main-wrap").hide();
                    $("#invoice").show();
        
                    // Trigger browser's print functionality
                    window.print();
        
                    // Show other content and hide the invoice after printing
                    $(".main-wrap").show();
                    $("#invoice").hide();
					localStorage.clear();
					
                }
                
                //Additems function
                let currentIndex = 0;

                function inputRowGen() {
                  let randomRate = Math.floor(Math.random() * 1000 + 1);
                  let id = currentIndex += 1;
                  let html = `<tr class="table-row" id="inputRow${id}">
                                <td class="btn-wrapper"><span class="drag-btn"><i class="ri-draggable"></i></span></td>
                                <td><input type="text" class="form-input itemname" placeholder="Enter Item" required></td>
                                <td><input type="text" class="form-input description" placeholder="Description" required></td>
                                <td><input type="number" class="form-input rate" value="${randomRate}" placeholder="Rate" required></td>
                                <td><input type="number" class="form-input quantity" placeholder="Quantity" value="0" required></td>
                                <td><input type="number" class="form-input amount" placeholder="0.00" readonly></td>
                                <td class="btn-wrapper"><button type="button" class="btn btn-danger" onclick="removeInputRow(${id})"><i class="ri-delete-bin-line"></i></button></td>
                              </tr>`;
                  $('#tbody').append(html);
                  updateRowData();
                }
              
                function removeInputRow(inputRowId) {
                  $(`#inputRow${inputRowId}`).remove();
                  updateRowData();
                }
              
                function updateRowData() {
                  let totalAmount = 0;
                  let isValid = true;
                  let allItemsData = [];
              
                  $("tr[id^='inputRow']").each(function() {
                    const itemName = $(this).find(".itemname").val().trim();
                    const itemDescription = $(this).find(".description").val().trim();
                    const quantity = parseFloat($(this).find(".quantity").val()) || 0;
                    const itemRate = parseFloat($(this).find(".rate").val()) || 0;
                    let onceItemData = {};
              
                    if (!itemName || !itemDescription || !quantity || !itemRate) {
                      isValid = false;
                    } else {
                      onceItemData = {
                        itemName: itemName,
                        itemDescription: itemDescription,
                        itemRate: itemRate,
                        quantity: quantity,
                      }
                      allItemsData.push(onceItemData);
                    }
              
                    const totalItemPrice = itemRate * quantity;
                    $(this).find(".amount").val(totalItemPrice.toFixed(2));
                    totalAmount += totalItemPrice;
                  });
                  $("#totalAmount").text(totalAmount.toFixed(2));
              
                  if(allItemsData.length > 0){
                    return allItemsData;
                  }else{
                    return !isValid;
                  }
                }
        
        

            // Function to handle form submission
        $("#invoiceForm").submit(function(event) {
            
            event.preventDefault();
            saveToLocalStorage()
			generateInvoice()
			
        });

        let invoiceDataBase = JSON.parse(localStorage.getItem("invoiceData")) || [];
        function saveToLocalStorage() {
            localStorage.clear();
            oneTimeAllData = [];
            let itemsData = updateRowData();
            let invoiceNo = $("#invoice_no").val() || null;
            let invoiceId = {
              invoiceNo: invoiceNo,
            };
        
            if (invoiceNo) {
              oneTimeAllData.push(invoiceId);
            }
            if (!updateRowData()) {
              alert("Please add items")
            }else{
              oneTimeAllData.push(itemsData);
            }
        
            let myformData = {}
            // Get values from form fields
            let companyName = $("#companyName").val() || null;
            let streetAddress = $("#streetAddress").val() || null;
            let city = $("#city").val() || null;
            let zipcode = $("#zipcode").val() || null;
            let country = $("#country").val() || null;
            let phoneNumber = $("#phoneNumber").val() || null;
            let invoiceNumber = $("#InvoiceNumber").val() || null;
            let sendTo = $("#send_to").val() || null;
            let invoiceDate = $("#invoiceDate").val() || null;
            let dueDate = $("#dueDate").val() || null;

            if(companyName && streetAddress && city && zipcode && country && phoneNumber  && sendTo && invoiceDate && dueDate && invoiceNumber) {
                myformData = {
                    companyName : companyName,
                    streetAddress : streetAddress,
                    city : city,
                    zipcode : zipcode,
                    country : country,
                    phoneNumber : phoneNumber,
                    sendTo : sendTo,
                    invoiceDate : invoiceDate,
                    dueDate : dueDate,
                    invoiceNumber : invoiceNumber 
                }
                oneTimeAllData.push(myformData);
            }
        
            if (oneTimeAllData.length > 0) {
              invoiceDataBase.push(oneTimeAllData);
              localStorage.setItem("invoiceData", JSON.stringify(invoiceDataBase)); // Store data in localStorage
              console.log("Data saved to localStorage");
              console.log(oneTimeAllData);
              // Clear form data after submission
              $("#invoiceForm")[0].reset();
              $("#tbody").empty(); // Clear table rows
              currentIndex = 0; // Reset index for new rows
              oneTimeAllData = []; // Reset data array
            } else {
              console.log("Please fill in all required fields");
            }
          }

console.log(invoiceDataBase[0])
         function generateInvoice(){
            let invoiceDataBase = JSON.parse(localStorage.getItem("invoiceData")) || [];
    
            if (invoiceDataBase.length === 0) {
              console.log("No invoice data found");
              return; // Exit the function if no data is available
            }
            let randomNumber = Math.floor(Math.random() * 10 + 5)
            let itemData = invoiceDataBase[0][0];
            let Data = invoiceDataBase[0][1];
            let subTotal = 0;
          
            itemData.forEach(function (item) {
              subTotal += item.itemRate * item.quantity;
              let itemRow = `<tr class="ser">
                            <td class="mtxt">${item.itemName}</td>
                            <td style="text-align:right;">${item.itemRate}</td>
                            <td style="text-align:right;">${item.quantity}</td>
                            <td style="text-align:right;">$${item.itemRate * item.quantity}</td>
                            </tr>
                            <tr class="ser2">
                                <td>${item.itemDescription}</td>
                                <td style="text-align:right;">+Tax</td>
                                <td style="text-align:right;"></td>
                                <td style="text-align:right;"></td>
                            </tr>
                            <tr>
                                <td colspan="4" style="border-bottom: 2px solid #d5d5d5; padding-top:15px;"></td>
                            </tr>`;
              $("#items-row").append(itemRow); // Append row to table
              console.log(item)
            });

            
            let totalamount = subTotal - 98.91
            let comanyData = `<h1 class="xl2">${Data.companyName}</h1>
            <ul class="text-end" style="margin-top:-9px;">
                <li>${Data.streetAddress}</li>
                <li>${Data.city}, ${Data.country}</li>
                <li>${Data.zipcode}</li>
                <li>${Data.companyName}</li>
                <li>${Data.phoneNumber}</li>
            </ul>`

            let clientData = `<h2 class="larg">Billed To</h2>
            <li>${Data.sendTo}</li>
            <li>${Data.city}, ${Data.country}</li>
            <li>${Data.zipcode}</li>
            <li>${Data.companyName}</li>
            <li>${Data.phoneNumber}</li>`

            let invoiceBillData =`<div class="issue1">
            <h2 class="date1">Date issued</h2><br>
            <p style="margin-top:-13px; font-size:19px;">${Data.invoiceDate}</p>
            
            <h2 class="date1-5">Due Date</h2><br>
            <p style="margin-top:-13px; font-size:19px;">${Data.dueDate}</p>
        </div>
        <div class="issue2">
            <h2 class="date2">Invoice Number</h2><br>
            <p style="margin-top:-13px; font-size:19px;">${Data.invoiceNumber}</p>
        </div>
        <div class="issue3">
            <h2 class="date3">Amount Due</h2><br>
            <p style="margin-top:-13px; font-size:19px;">${totalamount}</p>
        </div>`

        let calculatedData = `<tr class="newtbl">
        <td style="text-align:right;">Subtotal</td>
        <td style="text-align:right; width:230px;">$${subTotal}</td>
    </tr>
    <tr class="newtb2">
        <td style="text-align:right;">Discount</td>
        <td style="text-align:right; width:230px;">-$179.84</td>
    </tr>
    <tr class="newtb3">
        <td style="text-align:right;">Tax</td>
        <td style="text-align:right; width:230px;">+$80.93</td>
    </tr>
    <tr>
        <td colspan="3" style="border-bottom:2px solid #d5d5d5; padding-top:15px;"></td>
    </tr>
    <tr class="newtb4">
        <td style="text-align:right;">Total</td>
        <td style="text-align:right; width:230px;">$${totalamount}</td>
    </tr>
    <tr class="newtb5">
        <td style="text-align:right;">Deposited</td>
        <td style="text-align:right; width:230px;">$${subTotal}</td>
    </tr>
    <tr>
        <td colspan="2" style="border-bottom:3px solid #2a24bf; padding-top:15px;"></td>
    </tr>
    <tr class="newtb6">
        <td style="text-align:right;">Deposit due</td>
        <td style="text-align:right; width:230px;">$${subTotal}</td>
    </tr>`
    $("#companyData").append(comanyData);
    $("#clientData").append(clientData);
    $("#invoiceBillData").append(invoiceBillData);
    $("#calculatedData").append(calculatedData);

         }
          
        // Update table content in main-wraper section
        // $(".company h1").text(companyName);
        // $(".company ul li:eq(0)").text(streetAddress);
        // $(".company ul li:eq(1)").text(city);
        // $(".company ul li:eq(2)").text(zipcode);
        // $(".company ul li:eq(3)").text(country);
        // $(".company ul li:eq(4)").text(phoneNumber);
        // $(".Client li:eq(0)").text(clientName);
        // $(".Client li:eq(1)").text(sendTo);
        // $(".date1-5 p").text(dueDate);
        // $(".date1 p").text(invoiceDate);
        
        // // Assuming you have a table row for each item
        // $(".ser td:eq(1)").text($("#item_name").val());
        // $(".ser td:eq(2)").text($("#description").val());
        // $(".ser td:eq(3)").text($("#rate").val());
        // $(".ser td:eq(4)").text($("#quantity").val());
        // $(".ser td:eq(5)").text($("#amount").val());
        
        // // Update subtotal, tax, and total
        // // $(".newtbl td:eq(1)").text(subtotal);
        // // $(".newtb3 td:eq(1)").text(tax);
        // // $(".newtb4 td:eq(1)").text(total);
        
        // // Show the invoice section
        // $(".main-wrap").hide();
        // $("#invoice").show();