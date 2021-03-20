import argparse
import sys
import os
import subprocess
from getpass import getpass
from mysql.connector import connect, Error

def getData(agmt_no):
    try:
        with connect(
            host="localhost",
            user=input("Enter username: "),
            password=getpass("Enter password: "),
            database="cyberaliens",
        ) as connection:
            query = "SELECT a.price,a.expirydate,a.agreementdate,v.vendorname,p.productname,a.agreementid FROM Agreement AS a INNER JOIN Vendor AS v ON v.vendorid = a.vendorid INNER JOIN Product AS p ON p.productid = a.productid WHERE a.agreementid="+str(agmt_no)
            with connection.cursor() as cursor:
                cursor.execute(query)
                for db in cursor:
                    #db = db + (agmt_no,)
                    pass
    except Error as e:
        print(e)
    return db[:-1]


def print_agreement(db):
    pass

# Obtain the parsed agreement number
agmt_no = sys.argv[1]

# Extract data for specific agreement number
db = getData(agmt_no)
content = open("agreement_template.tex","r").read()
parser = argparse.ArgumentParser()
parser.add_argument('-v', '--vendor', default=db[3])
parser.add_argument('-p', '--product', default=db[4])
parser.add_argument('-d', '--price', default="{0:.2f}".format(db[0]))
parser.add_argument('-e', '--expiry', default=db[1].strftime('%A %d %B %Y'))
parser.add_argument('-c', '--agreementdate', default=db[2].strftime('%A %d %B %Y'))
parser.add_argument('-a', '--agreement', default=agmt_no)
args, unknown = parser.parse_known_args()

# Compile agreement
with open('agreement.tex','w') as f:
    f.write(content%args.__dict__)
cmd = ['pdflatex', '-interaction', 'nonstopmode', 'agreement.tex']
proc = subprocess.Popen(cmd)
proc.communicate()

retcode = proc.returncode
if not retcode == 0:
    os.unlink('agreement.pdf')
    raise ValueError('Error {} executing command: {}'.format(retcode, ' '.join(cmd)))

#Clean uncessary files
os.unlink('agreement.tex')
os.unlink('agreement.log')
os.unlink('agreement.aux')
