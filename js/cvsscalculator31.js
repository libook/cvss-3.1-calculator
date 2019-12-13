/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2019, FIRST.ORG, INC.
 * Copyright (c) 2019, 李丹阳<libook7@gmail.com>.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
 * following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following
 * disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the
 * following disclaimer in the documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote
 * products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
 * INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 * WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

"use strict";

const language = navigator.language || 'en_US';

function updateScores() {
    var result = CVSS31.calculateCVSSFromMetrics(inputValue('input[type="radio"][name=AV]:checked'), inputValue('input[type="radio"][name=AC]:checked'), inputValue('input[type="radio"][name=PR]:checked'), inputValue('input[type="radio"][name=UI]:checked'), inputValue('input[type="radio"][name=S]:checked'), inputValue('input[type="radio"][name=C]:checked'), inputValue('input[type="radio"][name=I]:checked'), inputValue('input[type="radio"][name=A]:checked'), inputValue('input[type="radio"][name=E]:checked'), inputValue('input[type="radio"][name=RL]:checked'), inputValue('input[type="radio"][name=RC]:checked'), inputValue('input[type="radio"][name=CR]:checked'), inputValue('input[type="radio"][name=IR]:checked'), inputValue('input[type="radio"][name=AR]:checked'), inputValue('input[type="radio"][name=MAV]:checked'), inputValue('input[type="radio"][name=MAC]:checked'), inputValue('input[type="radio"][name=MPR]:checked'), inputValue('input[type="radio"][name=MUI]:checked'), inputValue('input[type="radio"][name=MS]:checked'), inputValue('input[type="radio"][name=MC]:checked'), inputValue('input[type="radio"][name=MI]:checked'), inputValue('input[type="radio"][name=MA]:checked'));
    if (result.success === true) {
        var L = document.querySelectorAll(".needBaseMetrics"), i = L.length;
        while (i--) {
            hide(L[i]);
        }
        parentNode(text("#baseMetricScore", result.baseMetricScore), ".scoreRating").className = "scoreRating " + result.baseSeverity.toLowerCase();
        text("#baseSeverity", "(" + result.baseSeverity + ")");
        parentNode(text("#temporalMetricScore", result.temporalMetricScore), ".scoreRating").className = "scoreRating " + result.temporalSeverity.toLowerCase();
        text("#temporalSeverity", "(" + result.temporalSeverity + ")");
        parentNode(text("#environmentalMetricScore", result.environmentalMetricScore), ".scoreRating").className = "scoreRating " + result.environmentalSeverity.toLowerCase();
        text("#environmentalSeverity", "(" + result.environmentalSeverity + ")");
        show(inputValue("#vectorString", result.vectorString));
        window.location.hash = result.vectorString;
    } else {
        if (result.error === "Not all base metrics were given - cannot calculate scores.") {
            var L = document.querySelectorAll(".needBaseMetrics"), i = L.length;
            while (i--) {
                show(L[i]);
            }
            hide("#vectorString");
        }
    }
}

function delayedUpdateScores() {
    setTimeout(updateScores, 100);
}

window.Element && function (ElementPrototype) {
    ElementPrototype.matchesSelector = ElementPrototype.matchesSelector || ElementPrototype.mozMatchesSelector || ElementPrototype.msMatchesSelector || ElementPrototype.oMatchesSelector || ElementPrototype.webkitMatchesSelector || function (selector) {
        var node = this,
            nodes = (node.parentNode || node.document).querySelectorAll(selector),
            i = -1;
        while (nodes[++i] && nodes[i] != node) {
        }
        return !!nodes[i];
    };
}(Element.prototype);
var matchesSelector = function (node, selector) {
    if (!("parentNode" in node) || !node.parentNode) {
        return false;
    }
    return Array.prototype.indexOf.call(node.parentNode.querySelectorAll(selector)) != -1;
};

function node() {
    for (var i = 0; i < arguments.length; i++) {
        var o = arguments[i];
        if (typeof (o) == "string" && o) {
            return document.querySelector(o);
        } else {
            if ("nodeName" in o) {
                return o;
            } else {
                if ("jquery" in o) {
                    return o.get(0);
                }
            }
        }
    }
    return false;
}

function parentNode(p, q) {
    if (!p || !(p = node(p))) {
        return;
    } else {
        if ((typeof (q) == "string" && p.matchesSelector(q)) || p == q) {
            return p;
        } else {
            if (p.nodeName.toLowerCase() != "html") {
                return parentNode(p.parentNode, q);
            } else {
                return;
            }
        }
    }
}

function bind(q, tg, fn) {
    var o = node(q);
    if (!o) {
        return;
    }
    if (o.addEventListener) {
        o.addEventListener(tg, fn, false);
    } else {
        if (o.attachEvent) {
            o.attachEvent("on" + tg, fn);
        } else {
            o["on" + tg] = fn;
        }
    }
    return o;
}

function text(q, s) {
    var e = node(q);
    if (!e) {
        return;
    }
    if (arguments.length > 1) {
        if ("textContent" in e) {
            e.textContent = s;
        } else {
            e.innerText = s;
        }
        return e;
    }
    return e.textContent || e.innerText;
}

function hide(q) {
    var e = node(q);
    if (!e) {
        return;
    }
    e.setAttribute("style", "display:none");
    return e;
}

function show(q) {
    var e = node(q);
    if (!e) {
        return;
    }
    e.setAttribute("style", "display:inline-block");
    return e;
}

function inputValue(q, v) {
    var e = document.querySelector(q);
    if (!e || e.nodeName.toLowerCase() != "input") {
        return;
    }
    if (arguments.length > 1) {
        e.value = v;
        return e;
    }
    return e.value;
}

function setMetricsFromVector(vectorString) {
    var result = true;
    var urlMetric;
    var metricValuesToSet = {
        AV: undefined,
        AC: undefined,
        PR: undefined,
        UI: undefined,
        S: undefined,
        C: undefined,
        I: undefined,
        A: undefined,
        E: "X",
        RL: "X",
        RC: "X",
        CR: "X",
        IR: "X",
        AR: "X",
        MAV: "X",
        MAC: "X",
        MPR: "X",
        MUI: "X",
        MS: "X",
        MC: "X",
        MI: "X",
        MA: "X",
    };
    var vectorStringRegex_31 = /^CVSS:3.1\/((AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])\/)*(AV:[NALP]|AC:[LH]|PR:[UNLH]|UI:[NR]|S:[UC]|[CIA]:[NLH]|E:[XUPFH]|RL:[XOTWU]|RC:[XURC]|[CIA]R:[XLMH]|MAV:[XNALP]|MAC:[XLH]|MPR:[XUNLH]|MUI:[XNR]|MS:[XUC]|M[CIA]:[XNLH])$/;
    if (vectorStringRegex_31.test(vectorString)) {
        var urlMetrics = vectorString.substring("CVSS:3.1/".length).split("/");
        for (var p in urlMetrics) {
            var urlMetric = urlMetrics[p].split(":");
            metricValuesToSet[urlMetric[0]] = urlMetric[1];
        }
        if (metricValuesToSet.AV !== undefined && metricValuesToSet.AC !== undefined && metricValuesToSet.PR !== undefined && metricValuesToSet.UI !== undefined && metricValuesToSet.S !== undefined && metricValuesToSet.C !== undefined && metricValuesToSet.I !== undefined && metricValuesToSet.A !== undefined) {
            for (var p in metricValuesToSet) {
                document.getElementById(p + "_" + metricValuesToSet[p]).checked = true;
            }
        } else {
            result = "NotAllBaseMetricsProvided";
        }
    } else {
        result = "MalformedVectorString";
    }
    updateScores();
    return result;
}

var CVSSVectorInURL;

function urlhash() {
    var h = window.location.hash;
    CVSSVectorInURL = h;
    setMetricsFromVector(h.substring(1));
}

function inputSelect() {
    this.setSelectionRange(0, this.value.length);
}

function cvssCalculator() {
    if (!("CVSS31" in window) || !("CVSS31_Help" in window)) {
        setTimeout(cvssCalculator, 100);
        return;
    }

    const helpText = CVSS31_Help[`helpText_${language}`];

    var L, i, n;
    L = document.querySelectorAll(".cvss-calculator input");
    i = L.length;
    while (i--) {
        bind(L[i], "click", delayedUpdateScores);
    }
    for (n in helpText) {
        document.getElementById(n).setAttribute("title", helpText[n]);
    }
    urlhash();
    if (("onhashchange" in window)) {
        window.onhashchange = urlhash;
    }
    bind(bind("#vectorString", "click", inputSelect), "contextmenu", inputSelect);
}

cvssCalculator();
