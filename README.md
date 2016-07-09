InouK Python DeBugger for Cloud9

This project is an attempt to write a cloud9 integrated Python debugger.

This is a work in progress ; not usable right now.

Currently this work is Private !

To use:

Install Python IKPdb debugger

pip install git+git@bitbucket.org:cmorisse/ikpdb.git#egg=ikpdb


Known issues: 

* Cloud9 failed to open files from Call Stack when files are not stored under 
  workspace. Typically there is a problem with python code id /usr/lib. This 
  seems to be a bug in cloud9 util.normalizePath() which removes leading '/'


Current limitations:
** Suspend is not available. 
** You can't set a breakpoint while the debugged program is running. 
   You must set breakpoints before launching or wait until the program reach a breakpoint.


Cyril
