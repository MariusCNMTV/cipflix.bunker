Set WshShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Get the path of the current script (launch.vbs) and the executable (miniweb.exe)
strScriptFolder = objFSO.GetParentFolderName(WScript.ScriptFullName)
strExecutable = strScriptFolder & "\miniweb.exe"
strArguments = " -p 3000"
strScriptPath = WScript.ScriptFullName
strRegistryKey = "HKCU\Software\Microsoft\Windows\CurrentVersion\Run\MiniWebApp"

' Check if the script is already in the startup registry
On Error Resume Next
strExisting = WshShell.RegRead(strRegistryKey)
If Err.Number <> 0 Then
    ' If it's not in the registry, add it
    WshShell.RegWrite strRegistryKey, "wscript.exe " & Chr(34) & strScriptPath & Chr(34)
    WshShell.Popup "The application has been added to startup.", 5, "Info", 64
    Err.Clear
End If
On Error GoTo 0

' Run the miniweb application
WshShell.Run strExecutable & strArguments, 0, False
