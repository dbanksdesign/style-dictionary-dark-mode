//
//  BackgroundView.swift
//  StyleDictionaryDarkModeDemo
//
//  Created by Banks, Daniel on 3/19/21.
//  Copyright © 2021 Amazon. All rights reserved.
//

import Foundation
import SwiftUI

struct BackgroundRow: View {
    var label: String
    var color: Color
    
    var body: some View {
        HStack {
            ZStack {
                Rectangle()
                    .fill(color)
                    .frame(width: 50, height: 50)
            }
            VStack(alignment: .leading) {
                Text(label)
            }.padding(10)
            Spacer()
        }
    }
}

struct BackgroundView: View {
    var body: some View {
        VStack {
            BackgroundRow(label:"Primary", color:Color.backgroundPrimary)
            BackgroundRow(label:"Secondary", color:Color.backgroundSecondary)
            BackgroundRow(label:"Tertiary", color:Color.backgroundTertiary)
            BackgroundRow(label:"Danger", color:Color.backgroundDanger)
            BackgroundRow(label:"Warning", color:Color.backgroundWarning)
            BackgroundRow(label:"Success", color:Color.backgroundSuccess)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.backgroundPrimary)
        .navigationBarTitle("Background Colors")
    }
}

struct BackgroundView_Previews: PreviewProvider {
    static var previews: some View {
        BackgroundView()
    }
}

