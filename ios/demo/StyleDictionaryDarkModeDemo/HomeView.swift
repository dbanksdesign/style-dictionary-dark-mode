//
//  HomeView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 3/10/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI
import StyleDictionaryDarkMode

struct HomeView: View {
    var body: some View {
        VStack {
            Text("Hello, World!").foregroundColor(Color.coreRed200)
            .overlay(
                RoundedRectangle(cornerRadius: 4)
                    .stroke(Color.borderPrimary, lineWidth: 1)
            )
            Image.logo
            Image.map
                .resizable()
                .scaledToFit()
                .frame(width: 100, height: 100, alignment: .center)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.backgroundPrimary)
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
