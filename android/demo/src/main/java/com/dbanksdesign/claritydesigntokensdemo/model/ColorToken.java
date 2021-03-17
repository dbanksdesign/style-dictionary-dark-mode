package com.dbanksdesign.claritydesigntokensdemo.model;

public class ColorToken {
    public String name;
    public String type;
    public int value;

    public ColorToken(String name, String type, int value) {
        this.name = name;
        this.value = value;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }
}
