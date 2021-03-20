# Creating formal agreements in PDF format

Call the python script with the agreement number that needs to be printed. For instance, if you wish to print agreement number 5, run:
```
$ python build_agreement.py 5
```
The agreement number should be printed as soon as the company accepts the vendor's proposed price and the PDF document thus generated should be attached to the confirmation email sent to the vendor.

## Description of files
1. **build_agreement.py**: Python script that compiles the agreement in PDF.
2. **agreement_template.tex**: The legal document template. This has to be changed for each client based on their company's contract. This is a LaTeX file and the following 6 arguments are parsed into it by `build_agreement.py`: 
  * *agreementdate*: The date that the agreement is finalised (`Agreement.agreementdate`).
  * *agreement*:  The agreement number. This is the primary key of the Agreement table (`Agreement.agreementid`).
  * *vendor*: The vendor's name (`Vendor.vendorname`).
  * *product*: The product's name (`Product.productname`).
  * *price*: The price of the product (`Agreement.price`).
  * *expiry*: The expiry date of this agreement (`Agreement.expirydate`).
3. **logo.jpg**: The client's company logo. It has to be named logo.jpg. The logo size will have to be adjusted in `agreement_template.tex` by changing the `scale=0.05` value in line 9.
4. **agreement.pdf**: The final agreement that is compiled. This is a sample for reference purposes.
