
var pie = new d3pie("graph2", {
    "size": {
        "canvasWidth": 590,
        "pieOuterRadius": "90%"
    },
    "data": {
        "sortOrder": "value-desc",
        "content": [
            {
                "label": "Other Guns",
                "value": 150,
                "color": "#2484c1"
            },
            {
                "label": "Rifles",
                "value": 50,
                "color": "#0c6197"
            },
            {
                "label": "Shotguns",
                "value": 75,
                "color": "#4daa4b"
            },
            {
                "label": "Handguns",
                "value": 400,
                "color": "#90c469"
            },
            {
                "label": "",
                "value": null,
                "color": "#efefef"
            }
        ]
    },
    "labels": {
        "outer": {
            "pieDistance": 32
        },
        "inner": {
            "hideWhenLessThanPercentage": 3
        },
        "mainLabel": {
            "fontSize": 11
        },
        "percentage": {
            "color": "#ffffff",
            "decimalPlaces": 0
        },
        "value": {
            "color": "#adadad",
            "fontSize": 11
        },
        "lines": {
            "enabled": true
        },
        "truncation": {
            "enabled": true
        }
    },
    "tooltips": {
        "enabled": true,
        "type": "placeholder",
        "string": "{label}: {value}, {percentage}%",
        "styles": {
            "fadeInSpeed": 439
        }
    },
    "effects": {
        "pullOutSegmentOnClick": {
            "effect": "linear",
            "speed": 400,
            "size": 8
        }
    },
    "misc": {
        "gradient": {
            "enabled": true,
            "percentage": 100
        }
    }
});