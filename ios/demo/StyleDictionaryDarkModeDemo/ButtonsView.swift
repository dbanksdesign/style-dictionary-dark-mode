//
//  ButtonsView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 3/10/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI

struct ButtonsView: View {
    var body: some View {
        VStack(spacing: 20) {
            Button(action: {
                print("hello world")
            }) {
                Text("Help")
                    .background(Color.blue)
            }
        }.navigationBarTitle("Buttons")
    }
}
