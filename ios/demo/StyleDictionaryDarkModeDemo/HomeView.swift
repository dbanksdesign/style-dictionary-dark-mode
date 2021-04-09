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
            Image.logo
            Text("Dark mode with style dictionary")
                .foregroundColor(Color.fontPrimary)
        }
        .frame(minWidth: 0, maxWidth: .infinity, minHeight: 0, maxHeight: .infinity)
        .background(Color.backgroundPrimary)
        .edgesIgnoringSafeArea(.all)
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
