InouK Python DeBugger for Cloud9

This project is an attempt to write a cloud9 integrated Python debugger.

This is a work in progress ; not usable right now.

Currently this work is Private !

To use:

Install Python IKPdb debugger

pip install git+git@bitbucket.org:cmorisse/ikpdb.git#egg=ikpdb

# Virtualenv support and python interpreter selection

The Python interpreter used to run a program is defined in a [**"Cloud 9 Runner**"](https://docs.c9.io/docs/custom-runners). By default Cloud9 default python is '/usr/bin/python' and IKPdb default runner
uses it too.

To use a different interpreter, you must create a new runner using this one 
as a template:

```
// This file overrides the built-in Python 2 runner
// For more information see http://docs.c9.io:8080/#!/api/run-method-run
{
  "cmd": [
// Modify next line with path to the python interpreter you want to use  
    "/home/ubuntu/workspace/sandbox/py27/bin/python",
    "${debug?-m}",
    "${debug?ikpdb}",
    "${debug?--ikpdb-port=15471}",
//    "${debug?--ikpdb-log=GNC}",   // Uncomment this line to log debugger output
    "$file",
    "$args"
  ],
  "selector": "^.*\\.(python|py)$",
  "python_version": "python2",
  "info": "Your code: \\033[00m\\033[01;32m$file\\033[00m is running at \\033[01;34m$url\\033[00m.\n\\033[01;31mImportant:\\033[00m use \\033[01;32mos.getenv('PORT', 8080)\\033[00m as the port and \\033[01;32mos.getenv('IP', '0.0.0.0')\\033[00m as the host in your scripts!\n",
  "env": {
    "PYTHONPATH": "$python_path"
  },
  "debugport": 15471,
  "debugger": "pythondebug",
  "executable": "$file",
  "maxdepth": 50

}
```











# Known issues: 

* Cloud9 failed to open files from Call Stack when files are not stored under 
  workspace. Typically there is a problem with python code in /usr/lib. This 
  seems to be a bug in cloud9 util.normalizePath() which removes leading '/'


# Current limitations:
** Suspend is not available. 
** You can't set a breakpoint while the debugged program is running. 
   You must set breakpoints before launching or wait until the program reach a breakpoint.


Cyril
