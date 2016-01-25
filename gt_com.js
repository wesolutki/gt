/**
 * Created by Wesolutki on 2016-01-25.
 */

var url = "http://192.168.1.6:5000";

$.getJSON(
    url,
    function(data)
    {
        console.log(data);
        //alert(data);

        var html = "<ol class=\"tree\">";
        var count = 0;

        var createElement = function(data, depth)
        {
            var type = data["type"];
            var name = data["name"];
            //alert(type);
            if (type === "directory") {
                html += "<li>";
                html += "<label for=\"folder" + count + "\">" + name + "</label> <input type=\"checkbox\" ";
                if (depth === 0)
                {
                    html += "checked disabled ";
                }
                html += "id=\"folder" + count + "\" />";
                html += "<ol>";
                count++;

                createList(data, depth + 1);

                html += "</ol>";
                html += "</li>";
            }
            else if (type === "file") {
                html += "<li class=\"file\"><a href=\"\">" + name + "</a></li>";
            }
        };

        var createList = function(data, depth)
        {
            $.each( data["children"], function( key, value ) {
                //alert( key + ": " + value );
                createElement(value, depth);
            });
        };

        createList(data, 0);

        html += "</ol>";

        //console.log(html);

        $("body").append(html);
    }
);
