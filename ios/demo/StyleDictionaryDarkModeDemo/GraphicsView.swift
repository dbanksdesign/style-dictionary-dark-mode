//
//  GraphicsView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 4/9/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI
import StyleDictionaryDarkMode


struct GraphicsView: View {
    var body: some View {
        ZStack {
            ScrollView {
                VStack {
                    Image.empty
                        .resizable()
                        .scaledToFit()
                        .frame(minWidth: 0, maxWidth: .infinity)
                        .padding(.bottom, Size.paddingMedium)
                    Image.files
                        .resizable()
                        .scaledToFit()
                        .frame(minWidth: 0, maxWidth: .infinity)
                        .padding(.bottom, Size.paddingMedium)
                }.lineSpacing(50)
                .padding(Size.paddingXl)
            }
        }
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.backgroundPrimary)
    }
}
