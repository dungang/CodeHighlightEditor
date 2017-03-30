/**
 * Created by Lenovo on 2017/3/28.
 */

var CodeEditor = (function(){
    function CodeEditor(){
        this.swfContainerId = '';
        this.swfTextAreaId='';
        this.swfEditorObject='CodeHighlightEditor.swf';
        this.swfVersion='10.0.0';
        this.height='420';
        this.width='100%';

        // indicate the parser, aspx / csharp / javascript / css / vbscript / html / xml / php / phpcode
        this.parser='php';

        // set the editor to read-only mode
        this.readOnly=false;

        // the editor detects client installed fonts and use preferred fonts if installed.
        // NOTE: the charactor '|' is required at the begin and end of the list
        this.fonts='|Consolas|Courier New|Courier|Arial|Tahoma|';
        this.fontSize = 12;

        this.add.apply(this,arguments);
    }

    CodeEditor.prototype.add = function(options){
        for(var prop in options) {
            if(this.hasOwnProperty(prop)) {
                this[prop] = options[prop];
            }
        }
    };

    CodeEditor.prototype.render = function () {
        var id = 'ctrFlash' + this.swfTextAreaId.replace('-','');
        var flashVars = {
            flashId:id,
            textareaId:this.swfTextAreaId,
            parser: this.parser,
            readOnly: this.readOnly,
            preferredFonts : this.fonts,
            fontSize : this.fontSize,
            onload: "CodeEditor.onLoad",
            onchange: "CodeEditor.onChange"
        };
        var params = { menu: "false", /* wmode : "transparent", */allowscriptaccess : "always" };
        swfobject.embedSWF(this.swfEditorObject+'?now=' + (new Date()).getTime(),
            this.swfContainerId, this.width, this.height, this.swfVersion, null,
            flashVars, params, {
                id:id,
                name:id
            }
        )
    };

    CodeEditor.create = function (options) {
        return new CodeEditor(options).render();
    };

    CodeEditor.onLoad = function (swfId,textareaId) {
        alert('onload');
        console.log(document.getElementById(textareaId).value);
        document.getElementById(swfId)
            .setText(document.getElementById(textareaId).value);
    };

    CodeEditor.onChange = function (textareaId,code) {
        console.log(textareaId);
        var textArea = document.getElementById(textareaId);
        console.log(textArea);
        document.getElementById(textareaId).value = code;
    };

    return CodeEditor;
}());