//
//  ButtonsView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 3/10/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI
import StyleDictionaryDarkMode

struct GrowingButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding()
            .background(Color.blue)
            .foregroundColor(.white)
            .clipShape(Capsule())
            .scaleEffect(configuration.isPressed ? 1.2 : 1)
            .animation(.easeOut(duration: 0.2))
    }
}

struct PrimaryButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding(Size.buttonPadding)
            .background(
                configuration.isPressed ? Color.buttonPrimaryActiveBackgroundColor : Color.buttonPrimaryBackgroundColor)
            .foregroundColor(
                configuration.isPressed ? Color.buttonPrimaryActiveColor : Color.buttonPrimaryColor)
            .clipShape(RoundedRectangle(cornerRadius: Size.buttonBorderRadius))
            .scaleEffect(configuration.isPressed ? 0.9 : 1)
            .animation(.easeOut(duration: 0.2))
    }
}

struct OutlineButton: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .padding(Size.buttonPadding)
            .border(
                configuration.isPressed ? Color.buttonOutlineActiveBorderColor : Color.buttonOutlineBorderColor,
                width: Size.buttonOutlineBorderWidth)
            .background(
                configuration.isPressed ? Color.buttonOutlineActiveBackgroundColor : Color.buttonOutlineBackgroundColor)
            .foregroundColor(
                configuration.isPressed ? Color.buttonOutlineActiveColor : Color.buttonOutlineColor)
            .clipShape(RoundedRectangle(cornerRadius: Size.buttonBorderRadius))
            .scaleEffect(configuration.isPressed ? 0.9 : 1)
            .animation(.easeOut(duration: 0.2))
    }
}

struct ButtonsView: View {
    var body: some View {
        VStack(spacing: 20) {
            Button("Primary") {
                print("Primary Button pressed")
            }.buttonStyle(PrimaryButton())
            Button("Outline") {
                print("Outline Button pressed")
            }.buttonStyle(OutlineButton())
        }
        .navigationBarTitle("Buttons")
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.backgroundPrimary)
        .edgesIgnoringSafeArea(.all)
    }
}
